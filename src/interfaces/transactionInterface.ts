export interface CreateTransactionProps {
  title: string;
  amount: number;
  type: "credit" | "debit";
}

export interface GetransactionsProps {
  id: string;
  title: string;
  amount: number;
  created_at: string;
  session_id?: string | undefined;
}
