export class MonthlyResult{
    public id: number;
    public date: Date;
    public dateString: string;
    public income: number;
    public expense: number;
    /// <summary>
    /// income - expense = flow
    /// </summary>
    public flow: number;
    /// <summary>
    /// Segítségével leolvasható, hogy az adott időszakban nőtt-e a pénzem vagy sem és (+/-)mennyivel.
    /// </summary>
    public cumulatedFlow: number;
    public incomePerDay: number;
    public expensePerDay: number;
    public flowPerDay: number;
}