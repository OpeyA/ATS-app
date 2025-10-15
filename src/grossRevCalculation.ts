//Calculates gross revenue when salary is populated and shoudl be read only.
export const computeGrossRevenue = (salary?: number) => {
    return typeof salary === 'number'? Math.round(salary * .15) : undefined; 
};
