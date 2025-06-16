export const countries = [
    { value: "", label: "Select Country", code: "" },
    { value: "1", label: "Afghanistan", code: "+93" },
    { value: "2", label: "Albania", code: "+355" },
    { value: "3", label: "Algeria", code: "+213" },
    { value: "4", label: "India", code: "+91" },
    { value: "5", label: "United States", code: "+1" },
    { value: "6", label: "United Kingdom", code: "+44" },
    { value: "7", label: "Canada", code: "+1" },
    { value: "8", label: "Australia", code: "+61" },
    { value: "9", label: "China", code: "+86" },
    { value: "10", label: "Japan", code: "+81" },
    { value: "230", label: "Zimbabwe" },
  ];


  export const categories = [
    { id: 'Activation', name: 'Activation' },
    { id: 'Withdrawal', name: 'Withdrawal' },
    { id: 'Edit Profile', name: 'Edit Profile' },
    { id: 'Income', name: 'Income' },
    { id: 'Other', name: 'Other' },
  ];

  export const paymentModes = [
    { value: "", label: "Select Type" },
    { value: "1", label: "BEP20 USDT" },
    { value: "2", label: "TRC20 USDT" }
  ];

  export const FundRequestColumns = [
    {
      accessorKey: 'id',
      header: 'S_No',
      cell: info => <center>{info.getValue()}</center>
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => <center className="text-red-600">{info.getValue()}</center>
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: info => <center>{info.getValue()}</center>
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: info => <center>{info.getValue()}</center>
    },
    {
      accessorKey: 'transactionHash',
      header: 'Transaction Hash',
      cell: info => <center>{info.getValue()}</center>
    },
    {
      accessorKey: 'mode',
      header: 'Mode',
      cell: info => <center>{info.getValue()}</center>
    }
  ];



export const BASE_URL = "https://affiliates.pulsepromote.world/api";