export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      date_bookmarks: {
        Row: {
          elapsed_time: Json | null
          id: string
          inputted_date: string | null
          mode: string
          name: string
          tag: string | null
          user_id: string
        }
        Insert: {
          elapsed_time?: Json | null
          id?: string
          inputted_date?: string | null
          mode: string
          name: string
          tag?: string | null
          user_id: string
        }
        Update: {
          elapsed_time?: Json | null
          id?: string
          inputted_date?: string | null
          mode?: string
          name?: string
          tag?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "date_bookmarks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          bookmark_count: number | null
          id: string
          name: string | null
        }
        Insert: {
          bookmark_count?: number | null
          id?: string
          name?: string | null
        }
        Update: {
          bookmark_count?: number | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
