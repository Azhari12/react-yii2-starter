export type DataTableType = {
  data: unknown[];
  page: number;
  pageSize: number;
  success: boolean;
  totalCount: number;
  totalPages: number;
};

export type CategoryType = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
};
