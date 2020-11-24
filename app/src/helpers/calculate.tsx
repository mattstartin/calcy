export default class Calculate {

    public static doCalculate(calculation: string): string {
        
        return Math.round(eval(calculation)).toString();
    }

    public static isValid(calculation: string): boolean {

        return /^[0-9\.\+\-\*\(\)]*$/.test(calculation)
    }
  
}