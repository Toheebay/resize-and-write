export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agent_profiles: {
        Row: {
          agent_name: string
          company_name: string | null
          country: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          email: string | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          languages_spoken: string[] | null
          license_number: string | null
          location: string | null
          phone: string | null
          profile_image_url: string | null
          rating: number | null
          services_offered: string[] | null
          social_media: Json | null
          specialization: string[] | null
          total_clients: number | null
          total_reviews: number | null
          updated_at: string
          user_id: string
          website_url: string | null
          whatsapp: string | null
          years_experience: number | null
        }
        Insert: {
          agent_name: string
          company_name?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          languages_spoken?: string[] | null
          license_number?: string | null
          location?: string | null
          phone?: string | null
          profile_image_url?: string | null
          rating?: number | null
          services_offered?: string[] | null
          social_media?: Json | null
          specialization?: string[] | null
          total_clients?: number | null
          total_reviews?: number | null
          updated_at?: string
          user_id: string
          website_url?: string | null
          whatsapp?: string | null
          years_experience?: number | null
        }
        Update: {
          agent_name?: string
          company_name?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          languages_spoken?: string[] | null
          license_number?: string | null
          location?: string | null
          phone?: string | null
          profile_image_url?: string | null
          rating?: number | null
          services_offered?: string[] | null
          social_media?: Json | null
          specialization?: string[] | null
          total_clients?: number | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
          whatsapp?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      agent_subscriptions: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          payment_reference: string | null
          plan_id: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          payment_reference?: string | null
          plan_id?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          payment_reference?: string | null
          plan_id?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          application_date: string | null
          created_at: string | null
          deadline_date: string | null
          documents_submitted: string[] | null
          follow_up_date: string | null
          id: string
          notes: string | null
          scholarship_id: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          application_date?: string | null
          created_at?: string | null
          deadline_date?: string | null
          documents_submitted?: string[] | null
          follow_up_date?: string | null
          id?: string
          notes?: string | null
          scholarship_id: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          application_date?: string | null
          created_at?: string | null
          deadline_date?: string | null
          documents_submitted?: string[] | null
          follow_up_date?: string | null
          id?: string
          notes?: string | null
          scholarship_id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string
          author_name: string
          content: string
          created_at: string
          id: string
          image: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          author_name: string
          content: string
          created_at?: string
          id?: string
          image?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          image?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          agent_id: string | null
          booking_date: string | null
          created_at: string | null
          id: string
          package_id: string | null
          payment_status: string | null
          pilgrim_id: string | null
          status: string | null
          total_amount: number | null
          travel_date: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          booking_date?: string | null
          created_at?: string | null
          id?: string
          package_id?: string | null
          payment_status?: string | null
          pilgrim_id?: string | null
          status?: string | null
          total_amount?: number | null
          travel_date?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          booking_date?: string | null
          created_at?: string | null
          id?: string
          package_id?: string | null
          payment_status?: string | null
          pilgrim_id?: string | null
          status?: string | null
          total_amount?: number | null
          travel_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          created_at: string | null
          id: string
          message: string
          message_type: string | null
          room_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          message_type?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          message_type?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          country: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          language: string | null
          name: string
          room_type: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          name: string
          room_type?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          name?: string
          room_type?: string | null
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          category: string
          comments_count: number | null
          content: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          likes_count: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          comments_count?: number | null
          content: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          likes_count?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          comments_count?: number | null
          content?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          likes_count?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_content: {
        Row: {
          arabic_text: string
          content_type: string
          created_at: string | null
          english_translation: string | null
          id: string
          is_featured: boolean | null
          post_date: string | null
          posted_by: string | null
          reference: string | null
          title: string | null
          urdu_translation: string | null
        }
        Insert: {
          arabic_text: string
          content_type: string
          created_at?: string | null
          english_translation?: string | null
          id?: string
          is_featured?: boolean | null
          post_date?: string | null
          posted_by?: string | null
          reference?: string | null
          title?: string | null
          urdu_translation?: string | null
        }
        Update: {
          arabic_text?: string
          content_type?: string
          created_at?: string | null
          english_translation?: string | null
          id?: string
          is_featured?: boolean | null
          post_date?: string | null
          posted_by?: string | null
          reference?: string | null
          title?: string | null
          urdu_translation?: string | null
        }
        Relationships: []
      }
      document_templates: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          id: string
          is_premium: boolean | null
          title: string
          type: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_premium?: boolean | null
          title: string
          type: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_premium?: boolean | null
          title?: string
          type?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          created_at: string | null
          file_url: string | null
          id: string
          is_template: boolean | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
          version: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          file_url?: string | null
          id?: string
          is_template?: boolean | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
          version?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          file_url?: string | null
          id?: string
          is_template?: boolean | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
          version?: number | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          scheduled_for: string | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          scheduled_for?: string | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          scheduled_for?: string | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          agent_id: string | null
          capacity: number | null
          country: string | null
          created_at: string | null
          description: string | null
          duration_days: number | null
          features: string[] | null
          id: string
          is_active: boolean | null
          price: number
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          capacity?: number | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          price: number
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          capacity?: number | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          price?: number
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          agent_code: string | null
          amount: number
          created_at: string | null
          id: string
          notes: string | null
          payment_date: string
          payment_method: string | null
          receipt_url: string | null
          reference_number: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_code?: string | null
          amount: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date: string
          payment_method?: string | null
          receipt_url?: string | null
          reference_number?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_code?: string | null
          amount?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          receipt_url?: string | null
          reference_number?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          agent_code: string | null
          created_at: string | null
          email: string
          id: string
          updated_at: string | null
          user_type: string
          username: string
        }
        Insert: {
          agent_code?: string | null
          created_at?: string | null
          email: string
          id: string
          updated_at?: string | null
          user_type: string
          username: string
        }
        Update: {
          agent_code?: string | null
          created_at?: string | null
          email?: string
          id?: string
          updated_at?: string | null
          user_type?: string
          username?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          name: string
          progress: number | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name: string
          progress?: number | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name?: string
          progress?: number | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_scholarships: {
        Row: {
          created_at: string | null
          id: string
          scholarship_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          scholarship_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          scholarship_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_scholarships_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarships: {
        Row: {
          amount: number | null
          application_deadline: string | null
          application_url: string | null
          benefits: string[] | null
          country: string
          created_at: string | null
          currency: string | null
          degree_levels: string[]
          description: string | null
          eligibility_criteria: string | null
          fields_of_study: string[]
          id: string
          is_active: boolean | null
          language_requirements: string[] | null
          requirements: string[] | null
          title: string
          university: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          application_deadline?: string | null
          application_url?: string | null
          benefits?: string[] | null
          country: string
          created_at?: string | null
          currency?: string | null
          degree_levels: string[]
          description?: string | null
          eligibility_criteria?: string | null
          fields_of_study: string[]
          id?: string
          is_active?: boolean | null
          language_requirements?: string[] | null
          requirements?: string[] | null
          title: string
          university?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          application_deadline?: string | null
          application_url?: string | null
          benefits?: string[] | null
          country?: string
          created_at?: string | null
          currency?: string | null
          degree_levels?: string[]
          description?: string | null
          eligibility_criteria?: string | null
          fields_of_study?: string[]
          id?: string
          is_active?: boolean | null
          language_requirements?: string[] | null
          requirements?: string[] | null
          title?: string
          university?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          description: string | null
          duration_months: number
          features: string[] | null
          id: string
          is_active: boolean | null
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_months?: number
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_months?: number
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          admin_response: string | null
          created_at: string | null
          id: string
          message: string
          priority: string | null
          status: string | null
          subject: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_response?: string | null
          created_at?: string | null
          id?: string
          message: string
          priority?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_response?: string | null
          created_at?: string | null
          id?: string
          message?: string
          priority?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          project_id: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          invited_by: string
          project_id: string | null
          role: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          invited_by: string
          project_id?: string | null
          role?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          invited_by?: string
          project_id?: string | null
          role?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          bio: string | null
          country: string | null
          created_at: string | null
          current_degree_level: string | null
          field_of_study: string | null
          full_name: string | null
          goals: string | null
          gpa: number | null
          id: string
          phone: string | null
          preferred_languages: string[] | null
          profile_image_url: string | null
          target_countries: string[] | null
          target_degree_levels: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          country?: string | null
          created_at?: string | null
          current_degree_level?: string | null
          field_of_study?: string | null
          full_name?: string | null
          goals?: string | null
          gpa?: number | null
          id?: string
          phone?: string | null
          preferred_languages?: string[] | null
          profile_image_url?: string | null
          target_countries?: string[] | null
          target_degree_levels?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          country?: string | null
          created_at?: string | null
          current_degree_level?: string | null
          field_of_study?: string | null
          full_name?: string | null
          goals?: string | null
          gpa?: number | null
          id?: string
          phone?: string | null
          preferred_languages?: string[] | null
          profile_image_url?: string | null
          target_countries?: string[] | null
          target_degree_levels?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roadmaps: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          progress_percentage: number | null
          steps: Json | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          progress_percentage?: number | null
          steps?: Json | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          progress_percentage?: number | null
          steps?: Json | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_expired_posts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
