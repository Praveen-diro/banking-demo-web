import { CreditCard as CardIcon, Type, Download } from "lucide-react";
import CardChip from "@/card-chip.png";

interface CreditCardProps {
  balance: number;
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
}

interface CreditAccountProps extends CreditCardProps {
  Active?: string;
  CardType?: string;
  accountType?: string;
  lastTransaction?: string;
}

export const CreditAccount = ({
  balance,
  cardHolder,
  cardNumber,
  expiryDate,
  Active,
  CardType,
  accountType = 'Account Type',
  lastTransaction
}: CreditAccountProps) => {
  return (
    <div className="p-8 rounded-[20px] h-64 shadow-lg hover:shadow-xl transition-shadow text-white overflow-hidden" 
      style={{ background: Active === "Closed" 
        ? 'linear-gradient(107deg, #ED4949 0%, #F40606 100%)'
        : 'linear-gradient(107deg, #4C49ED 0%, #0A06F4 100%)'
      }}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-white/80">{accountType}</p>
              <p className="font-medium">{CardType}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">Status</p>
            <p className="font-medium">{Active || 'Active'}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-base text-white/80">Available Balance</p>
            <p className="text-4xl font-semibold mt-1">${(balance / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            {lastTransaction && (
              <p className="text-sm text-white/70 mt-1">Last transaction: {lastTransaction}</p>
            )}
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-white/70">Account Holder</p>
              <p className="text-lg font-medium">{cardHolder}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/70">Account Number</p>
              <p className="text-lg font-medium tracking-wider">****{cardNumber.slice(-4)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CreditAccount2 = ({
  balance,
  cardHolder,
  cardNumber,
  expiryDate,
  Active,
  CardType = 'Account Type',
  accountType = 'Account Type',
  lastTransaction
}: CreditAccountProps) => {
  return (
    <div className="p-8 rounded-[20px] h-64 shadow-lg hover:shadow-xl transition-shadow text-white overflow-hidden" 
      style={{ background: Active === "Closed" 
        ? 'linear-gradient(107deg, #ED4949 0%, #F40606 100%)'
        : 'linear-gradient(107deg, #6366F1 0%, #4F46E5 100%)'
      }}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-white/80">{accountType}</p>
              <p className="font-medium">{CardType}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">Status</p>
            <p className="font-medium">{Active || 'Active'}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-base text-white/80">Available Balance</p>
            <p className="text-4xl font-semibold mt-1">${(balance / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            {lastTransaction && (
              <p className="text-sm text-white/70 mt-1">Last transaction: {lastTransaction}</p>
            )}
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-white/70">Account Holder</p>
              <p className="text-lg font-medium">{cardHolder}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/70">Account Number</p>
              <p className="text-lg font-medium tracking-wider">****{cardNumber.slice(-4)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CreditCard = ({
  balance,
  cardHolder,
  cardNumber,
  expiryDate,
}: CreditCardProps) => {
  return (
    <div className="p-8 pt-8 pb-0 rounded-[20px] h-64 shadow-lg hover:shadow-xl transition-shadow text-white overflow-hidden" 
      style={{ background: 'linear-gradient(107deg, #4C49ED 0%, #0A06F4 100%)' }}>
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          <p className="text-base text-white/80">Available Balance</p>
          <div className="flex justify-between items-start">
            <p className="text-4xl font-semibold">${(balance / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <div className="w-12 h-8 flex items-center justify-center">
              <img src="public/sim-card-chip.png" alt="Card Chip" className="w-9 h-10" />
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-auto">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-white/70">CARD HOLDER</p>
              <p className="text-lg font-medium">{cardHolder}</p>
            </div>
            <div>
              <p className="text-sm text-white/70">VALID THRU</p>
              <p className="text-lg font-medium">{expiryDate}</p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white/10 -mx-8 px-8 py-4 mt-4">
            <p className="text-2xl tracking-wider">****{cardNumber.slice(-4)}</p>
            <div className="w-12 h-8">
              <div className="w-8 h-8 bg-white/30 rounded-full -ml-4" />
              <div className="w-8 h-8 bg-white/20 rounded-full -mt-8 ml-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CreditCardBack = ({
  balance,
  cardHolder,
  cardNumber,
  expiryDate,
}: CreditCardProps) => {
  return (
    <div className="p-8 pt-8 pb-0 rounded-[20px] h-64 shadow-2xl hover:shadow-xl transition-shadow bg-gray-100 text-black overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          <p className="text-base text-black/60">Available Balance</p>
          <div className="flex justify-between items-start">
            <p className="text-4xl font-semibold">${(balance / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <div className="w-12 h-8 flex items-center justify-center">
              <img src="/sim-card-chip.png" alt="Card Chip" className="w-9 h-10 brightness-0" />
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-auto">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-black/60">CARD HOLDER</p>
              <p className="text-lg font-medium">{cardHolder}</p>
            </div>
            <div>
              <p className="text-sm text-black/60">VALID THRU</p>
              <p className="text-lg font-medium">{expiryDate}</p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-100 -mx-8 px-8 py-4 mt-4">
            <p className="text-2xl tracking-wider">****{cardNumber.slice(-4)}</p>
            <div className="w-12 h-8">
              <div className="w-8 h-8 bg-gray-300 rounded-full -ml-4" />
              <div className="w-8 h-8 bg-gray-200 rounded-full -mt-8 ml-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};