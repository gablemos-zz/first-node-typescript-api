import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    const income = this.transactions
      .filter(incomeTransaction => incomeTransaction.type === 'income')
      .reduce((prevVal, elem) => prevVal + elem.value, 0);

    const outcome = this.transactions
      .filter(outcomeTransaction => outcomeTransaction.type === 'outcome')
      .reduce((prevVal, elem) => prevVal + elem.value, 0);

    const total = income - outcome;

    this.balance = { income, outcome, total };

    return transaction;
  }
}

export default TransactionsRepository;
