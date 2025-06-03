export const useAccounts = () => {
  const initialAccounts = [
    {
      id: 1,
      type: "Cash",
      accounts: [
        { id: 11, name: "Wallet", balance: 100 },
        { id: 12, name: "Piggy Bank", balance: 50 },
        { id: 13, name: "Safe", balance: 200 },
        { id: 14, name: "Emergency Fund", balance: 500 },
      ],
      dropdownOpen: false,
    },
    {
      id: 2,
      type: "Credit Cards",
      accounts: [
        { id: 21, name: "Visa", balance: -300 },
        { id: 22, name: "MasterCard", balance: -150 },
        { id: 23, name: "Amex", balance: -500 },
        { id: 24, name: "Discover", balance: -100 },
      ],
      dropdownOpen: false,
    },
    {
      id: 3,
      type: "Taxable",
      accounts: [
        { id: 31, name: "Brokerage", balance: 1000 },
        { id: 32, name: "Savings", balance: 2000 },
        { id: 33, name: "Checking", balance: 1500 },
        { id: 34, name: "Money Market", balance: 500 },
      ],
      dropdownOpen: false,
    },
    {
      id: 4,
      type: "Tax Advantaged",
      accounts: [
        { id: 41, name: "401k", balance: 8000 },
        { id: 42, name: "Roth IRA", balance: 6000 },
        { id: 43, name: "Traditional IRA", balance: 7000 },
        { id: 44, name: "HSA", balance: 3000 },
      ],
      dropdownOpen: false,
    },
    {
      id: 5,
      type: "Loans",
      accounts: [
        { id: 51, name: "Student Loan", balance: -10000 },
        { id: 52, name: "Car Loan", balance: -5000 },
        { id: 53, name: "Mortgage", balance: -200000 },
        { id: 54, name: "Personal Loan", balance: -2000 },
      ],
      dropdownOpen: false,
    },
    {
      id: 6,
      type: "Property",
      accounts: [
        { id: 61, name: "House", balance: 250000 },
        { id: 62, name: "Car", balance: 15000 },
        { id: 63, name: "Boat", balance: 8000 },
        { id: 64, name: "Land", balance: 50000 },
      ],
      dropdownOpen: false,
    },
    {
      id: 7,
      type: "Stock Options",
      accounts: [
        { id: 71, name: "RSU", balance: 12000 },
        { id: 72, name: "ESPP", balance: 5000 },
        { id: 73, name: "ISO", balance: 3000 },
        { id: 74, name: "NSO", balance: 2000 },
      ],
      dropdownOpen: false,
    },
  ];

  return initialAccounts;
};
