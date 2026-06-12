export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			lobbies: {
				Row: {
					lobby_id: string;
					lobby_name: string;
					start_time: string;
					study_min: number;
					break_min: number;
					is_private: boolean;
					is_in_school: boolean;
					member_count: number;
					last_activity_at: string;
					created_at: string;
				};
				Insert: {
					lobby_id?: string;
					lobby_name: string;
					start_time: string;
					study_min: number;
					break_min: number;
					is_private?: boolean;
					is_in_school?: boolean;
					member_count?: number;
					last_activity_at?: string;
					created_at?: string;
				};
				Update: {
					lobby_id?: string;
					lobby_name?: string;
					start_time?: string;
					study_min?: number;
					break_min?: number;
					is_private?: boolean;
					is_in_school?: boolean;
					member_count?: number;
					last_activity_at?: string;
					created_at?: string;
				};
				Relationships: [];
			};
		};
		Views: Record<never, never>;
		Functions: Record<never, never>;
		Enums: Record<never, never>;
		CompositeTypes: Record<never, never>;
	};
};

type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> =
	PublicSchema["Tables"][T]["Row"];

export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
	PublicSchema["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
	PublicSchema["Tables"][T]["Update"];
