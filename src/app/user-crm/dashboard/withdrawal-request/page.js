'use client';
import { useState } from 'react';

const WithdrawalRequest = () => {
  const [balance, setBalance] = useState('0.00');
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('0');
  const [walletAddress, setWalletAddress] = useState('');
  const [otp, setOtp] = useState('');
  const [walletStatus, setWalletStatus] = useState('');
  const [message, setMessage] = useState('');

  const limitInputLength = (input, maxLength) => {
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  };

  const calculateTokenToTRX = () => {
    // Implementation for token calculation
  };

  const fnGetPayDetails = () => {
    // Implementation for payment details
  };

  const fnSendWithdrawalRequest = () => {
    // Implementation for withdrawal request
  };

  const fnSendOTP = () => {
    // Implementation for sending OTP
  };

  return (
    <div className="w-full max-w-6xl p-4">
      <div className="col-xl-12 col-lg-12">
        <div className="card profile-card card-bx m-b30 glowing mb-3 bg-white rounded-lg shadow-md border-gray-500 border-1">
          <div className="card-header p-4">
            <div className="row">
              <div className="col-md-6 mb-2 hidden">
                <select 
                  name="type" 
                  id="type" 
                  className="form-control w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="0">--Select Wallet--</option>
                  <option value="1">Income Wallet</option>
                  <option value="2">Profit Wallet</option>
                </select>
              </div>
              <div className="col-md-6 mb-2 flex items-center justify-center">
                <h6 className="text-black text-center flex items-center m-0 justify-center">
                  Balance: $<span className="text-black" id="lblbalance">{balance}</span>
                </h6>
              </div>
            </div>
          </div>

          <form className="profile-form">
            <div className="card-body p-4">
              <div className="row">
                <div className="col-sm-2 mb-6">
                  <label className="form-label font-bold" htmlFor="exampleInputEmail1">
                    Withdrawal Amount
                  </label>
                  <input
                    type="number"
                    id="txtAmount"
                    className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                    placeholder="Enter Amount (500)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onInput={(e) => limitInputLength(e.target, 8)}
                    onKeyUp={calculateTokenToTRX}
                  />
                  <input type="hidden" id="lblMin" className="form-control" value="500" />
                  <input type="hidden" id="lblMax" className="form-control" value="5000" />
                  <input type="hidden" id="lblblnaddress" className="form-control" />
                  <input type="hidden" id="lblusdtaddress" className="form-control" value="0x59917DF522Bxxxxxxxxxxxxxxxxxxxx" />
                </div>

                <div className="col-sm-2 mb-6">
                  <label className="control-label" htmlFor="address">
                    Payment Mode
                  </label>
                  <select
                    name="PaymentMode"
                    id="PaymentMode"
                    className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                    value={paymentMode}
                    onChange={(e) => {
                      setPaymentMode(e.target.value);
                      fnGetPayDetails();
                    }}
                  >
                    <option value="0" className="bg-[#020b22] text-white">--Select--</option>
                    <option value="1" className="bg-[#020b22] text-white">BEP20 USDT</option>
                  </select>
                </div>

                <div className="col-sm-6 mb-6">
                  <label className="form-label font-bold" htmlFor="exampleInputEmail1">
                    Enter BEP20 USDT Wallet
                  </label>
                  <input
                    id="txtaccounNo"
                    className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                    placeholder="BEP20 USDT Wallet Address"
                    style={{ color: '#000' }}
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                  />
                  <label style={{ color: '#000' }} id="lblWalletStatus">
                    {walletStatus}
                  </label>
                </div>

                <div className="col-sm-6 mb-6">
                  <label className="form-label font-bold" htmlFor="emailID">
                    Enter OTP (Sent to Email)
                  </label>
                  <input
                    id="txtotp"
                    maxLength={6}
                    className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-[#86b7fe]"
                    placeholder="Enter OTP"
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-4 hidden">
              <label style={{ fontWeight: 'bold', fontSize: '17px' }}>OTP sent on:</label>
              <div className="form-group">
                <label id="lblemail" className="form-control"></label>
                <input type="hidden" id="HiddenField1" value="0.0000" />
              </div>
            </div>

            <div className="card-footer p-4">
              <div className="col-md-4">
                <button
                  style={{ backgroundColor: 'green', padding: '5px' }}
                  className="btn-ring btn btn-primary hidden"
                  id="btnanimationconfirm"
                >
                  Please Wait....
                </button>
                <button
                  id="Button1"
                  onClick={fnSendWithdrawalRequest}
                  type="button"
                  className="btn btn-warning new-btn-design4 text-white bg-[#582a94] px-4 py-2 rounded"
                >
                  SUBMIT
                </button>
                <button
                  style={{ borderRadius: '4px', padding: '5px' }}
                  className="btn-ring btn btn-warning hidden"
                  id="btnanimation"
                >
                  Please Wait....
                </button>
                <input
                  type="button"
                  id="lnkresend"
                  onClick={fnSendOTP}
                  className="btn btn-primary new-btn-design3 ml-4 bg-[#e6a114] px-4 py-2 rounded text-white"
                  value="Send OTP"
                />
              </div>
              <p className="mt-2">Note: Kindly check your address before withdrawing your assets.</p>
            </div>

            <div className="row">
              <div className="col-md-12">
                <p style={{ color: '#000', textAlign: 'center' }}></p>
                <label id="lblMsg" style={{ color: 'red', fontWeight: 'bold' }}>
                  {message}
                </label>
              </div>
            </div>
            <input type="hidden" id="hdnWalletAddress" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalRequest;