import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import useSaveBookmarkForm from "@/hooks/useSaveBookmarkForm";

import ErrorToast from "./ErrorToast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";

const formSchema = z.object({
  day: z
    .string()
    .min(1, "Day must be at least 1")
    .max(2, "Day cannot be more than 2 digits")
    .regex(/^\d+$/, "Day must be a valid number")
    .nonempty("Day is required"),
  month: z
    .string()
    .min(1, "Month must be at least 1")
    .max(2, "Month cannot be more than 2 digits")
    .regex(/^\d+$/, "Month must be a valid number")
    .nonempty("Month is required"),
  year: z
    .string()
    .min(3, "Year must be at least 4 digits")
    .max(4, "Year cannot be more than 4 digits")
    .regex(/^\d+$/, "Year must be a valid number")
    .nonempty("Year is required"),
});

export type FormValues = z.infer<typeof formSchema>;

const CalculationForm = () => {
  const [values, setValues] = useState<FormValues>({
    day: "",
    month: "",
    year: "",
  });

  const [calculatedDate, setCalculatedDate] = useState<FormValues>({
    day: "",
    month: "",
    year: "",
  });

  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();
  const { onOpen, isOpen, onClose } = useSaveBookmarkForm();

  const form2 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: "1",
      month: "1",
      year: "2003",
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  const calculateTimeDifference = useCallback(() => {
    const { day, month, year } = values;
    const inputDate = new Date(Number(year), Number(month) - 1, Number(day));
    const currentTime = new Date();
    const timeDifference = Math.abs(inputDate.getTime() - currentTime.getTime());

    const oneYear = 1000 * 60 * 60 * 24 * 365.25;
    const years = Math.floor(timeDifference / oneYear);
    const remainingTime = timeDifference % oneYear;
    const oneMonth = 1000 * 60 * 60 * 24 * 30.44;
    const months = Math.floor(remainingTime / oneMonth);
    const remainingTimeMonths = remainingTime % oneMonth;
    const oneDay = 1000 * 60 * 60 * 24;
    const days = Math.floor(remainingTimeMonths / oneDay);

    setCalculatedDate({ day: days.toString(), month: months.toString(), year: years.toString() });
  }, [values]);

  const onSubmit = (formData: FormValues) => {
    setValues(formData);
  };

  async function onSaveSubmit(event: any) {
    event.preventDefault();

    console.log("clicked");

    const inputtedDay = event.target.inputtedDay.value;
    const inputtedMonth = event.target.inputtedMonth.value;
    const inputtedYear = event.target.inputtedYear.value;

    const { error } = await supabaseClient.from('user_date_bookmarks').insert({
      user_id: session?.user.id,
      bookmark_name: "Bookmark Name - 1",
      bookmark_tag: "random",
      desired_date: new Date(Number(inputtedYear), Number(inputtedMonth) - 1, Number(inputtedDay)),
    });

    if (error) {
      console.error(error.message);
    } else {
      onClose();
    }
  }

  const handleInputChange = (field: keyof FormValues, value: string) => {
    setValue(field, value);
  };

  useEffect(() => {
    if (values.day && values.month && values.year) {
      calculateTimeDifference();
    }
  }, [values, calculateTimeDifference]);

  return (
    <>
      <form key={1} className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 md:gap-6 lg:gap-8">
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-base lg:text-lg text-white">DAY</label>
            <input
              className="w-16 md:w-24 lg:w-48 px-2 py-2 md:py-3 lg:py-4 md:text-xl lg:text-3xl border border-gray-400 rounded-md bg-white text-black"
              placeholder="DD"
              {...register("day")}
              onChange={(e) => handleInputChange("day", e.target.value)}
            />
            {errors.day?.message && <ErrorToast errorText={errors.day?.message!} />}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-base lg:text-lg text-white">MONTH</label>
            <input
              className="w-16 md:w-24 lg:w-48 px-2 py-2 md:py-3 lg:py-4 md:text-xl lg:text-3xl border border-gray-400 rounded-md bg-white text-black"
              placeholder="MM"
              {...register("month")}
              onChange={(e) => handleInputChange("month", e.target.value)}
            />
            {errors.month?.message && <ErrorToast errorText={errors.month?.message!} />}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-base lg:text-lg text-white">YEAR</label>
            <input
              className="w-16 md:w-24 lg:w-48 px-2 py-2 md:py-3 lg:py-4 md:text-xl lg:text-3xl border border-gray-400 rounded-md bg-white text-black"
              placeholder="YYYY"
              {...register("year")}
              onChange={(e) => handleInputChange("year", e.target.value)}
            />
            {errors.year?.message && <ErrorToast errorText={errors.year?.message!} />}
          </div>
        </div>
        <div className='relative lg:my-8'>
          <hr className='border-b-purple-400 my-8' />
          <button
            type="submit"
            className='flex justify-center items-center rounded-full w-12 h-12 lg:w-16 lg:h-16 absolute right-0 -top-6 lg:-top-8 bg-sky-blue hover:scale-105'
          >
            <Image src="/icon-arrow.svg" alt="Icon Image" width={30} height={30} />
          </button>
        </div>
      </form>
      <div className="flex flex-col">
        {calculatedDate.day !== "" && calculatedDate.month !== "" && calculatedDate.year !== "" && (
          <button
            onClick={onOpen}
            className="flex justify-center items-center rounded-full w-12 h-12 lg:w-14 lg:h-14 absolute bottom-48 md:bottom-[12.5rem] lg:bottom-[17rem] bg-sky-blue hover:scale-105 cursor-pointer"
          >
            <BookmarkFilledIcon height={30} width={30} />
          </button>
        )}
        {isOpen && values.day !== "" && values.month !== "" && values.year !== "" && (
          <div>
            <Dialog open={isOpen} onOpenChange={onChange}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Do you want to add this date to your bookmarks list?</DialogTitle>
                </DialogHeader>
                <div className="w-full">
                  <form onSubmit={onSaveSubmit} className="space-y-8">
                    <div className='flex flex-col gap-8'>
                      <div className='flex gap-8'>
                        <div className="flex flex-col">
                          <label className="text-xs" htmlFor="inputtedDay">Day</label>
                          <input
                            type="text"
                            className="px-2 py-1 text-lg w-24"
                            id="inputtedDay"
                            name="inputtedDay"
                            placeholder={values.day}
                            value={values.day}
                            disabled
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs" htmlFor="inputtedMonth">Month</label>
                          <input
                            type="text"
                            className="px-2 py-1 text-lg w-24"
                            id="inputtedMonth"
                            name="inputtedMonth"
                            placeholder={values.month}
                            value={values.month}
                            disabled
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs" htmlFor="inputtedYear">Year</label>
                          <input
                            type="text"
                            className="px-2 py-1 text-lg w-24"
                            id="inputtedYear"
                            name="inputtedYear"
                            placeholder={values.year}
                            value={values.year}
                            disabled
                          />
                        </div>
                      </div>
                      <div className='flex gap-8'>
                        <div className="flex flex-col">
                          <label className="text-xs" htmlFor="calculatedDay">Day</label>
                          <input
                            type="text"
                            className="px-2 py-1 text-lg w-24"
                            id="calculatedDay"
                            name="calculatedDay"
                            placeholder={calculatedDate.day}
                            value={calculatedDate.day}
                            disabled
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs" htmlFor="calculatedMonth">Month</label>
                          <input
                            type="text"
                            className="px-2 py-1 text-lg w-24"
                            id="calculatedMonth"
                            name="calculatedMonth"
                            placeholder={calculatedDate.month}
                            value={calculatedDate.month}
                            disabled
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs" htmlFor="calculatedYear">Year</label>
                          <input
                            type="text"
                            className="px-2 py-1 text-lg w-24"
                            id="calculatedYear"
                            name="calculatedYear"
                            placeholder={calculatedDate.year}
                            value={calculatedDate.year}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit">Confirm</button>
                  </form>

                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 lg:gap-6 items-center">
            <span className="w-12 md:w-20 lg:w-32 text-4xl md:text-5xl lg:text-7xl font-bold text-white">
              {calculatedDate.year !== "" ? calculatedDate.year : "__"}
            </span>
            <span className="font-bold text-4xl md:text-5xl lg:text-7xl text-blue-900">years</span>
          </div>
          <div className="flex gap-2 lg:gap-6 items-center">
            <span className="w-12 md:w-20 lg:w-32 text-4xl md:text-5xl lg:text-7xl font-bold text-white">
              {calculatedDate.month !== "" ? calculatedDate.month : "__"}
            </span>
            <span className="font-bold text-4xl md:text-5xl lg:text-7xl text-blue-900">months</span>
          </div>
          <div className="flex gap-2 lg:gap-6 items-center">
            <span className="w-12 md:w-20 lg:w-32 text-4xl md:text-5xl lg:text-7xl font-bold text-white">
              {calculatedDate.day !== "" ? calculatedDate.day : "__"}
            </span>
            <span className="font-bold text-4xl md:text-5xl lg:text-7xl text-blue-900">days</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculationForm;

