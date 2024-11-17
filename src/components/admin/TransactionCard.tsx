import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { StatusDropdown } from './StatusDropdown';
import { Transaction, StatusUpdateResponse } from '../../types/transaction';
import { Status } from '../shared/Status';

interface TransactionCardProps {
  transaction: Transaction;
  isDark: boolean;
  onStatusUpdate: (transactionId: number, status: 'completed' | 'failed') => Promise<StatusUpdateResponse>;
}

export function TransactionCard({ transaction, isDark, onStatusUpdate }: TransactionCardProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const handleStatusUpdate = async (status: 'completed' | 'failed') => {
    try {
      setIsUpdating(true);
      const response = await onStatusUpdate(transaction.id, status);
      
      if (response.xpAdded) {
        let message = `+${response.xpAdded} XP ajoutés`;
        if (response.newRank) {
          message += ` • Nouveau rang : ${response.newRank}`;
        }
        setUpdateMessage(message);
      }
    } finally {
      setIsUpdating(false);
      setOpenDropdown(false);
    }
  };

  const formatCodes = (codes: string) => {
    return codes.split(',').map((code, index) => (
      <div key={index} className="mb-2">
        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Code {index + 1}:
        </span>
        <span className={`ml-2 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {code.trim()}
        </span>
      </div>
    ));
  };

  return (
    <div
      className={`${
        isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
      } border rounded-lg transition-all duration-200`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`text-current hover:opacity-75 transition-opacity`}
            >
              {isExpanded ? (
                <ChevronUp className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
              ) : (
                <ChevronDown className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
              )}
            </button>
            <div>
              <div className="flex items-center gap-3">
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {transaction.payment_method === 'crypto' 
                    ? `${transaction.crypto_type} (Crypto)`
                    : 'PayPal'
                  }
                </span>
                <Status status={transaction.payment_status} isDark={isDark} />
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {formatDate(new Date(transaction.payment_date))}
              </p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              disabled={isUpdating}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isDark ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-white text-gray-900 hover:bg-gray-50'
              } border border-gray-200 transition-colors ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isUpdating ? 'Mise à jour...' : 'Actions'}
              <ChevronDown className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'}`} />
            </button>
            {openDropdown && (
              <StatusDropdown
                isDark={isDark}
                onStatusUpdate={handleStatusUpdate}
                onClose={() => setOpenDropdown(false)}
              />
            )}
          </div>
        </div>

        {updateMessage && (
          <div className={`mt-2 text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            {updateMessage}
          </div>
        )}

        {isExpanded && (
          <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Montant initial</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {transaction.payment_value.toFixed(2)} €
                </p>
              </div>

              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Montant final</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {transaction.final_amount.toFixed(2)} €
                </p>
              </div>

              <div className="md:col-span-2">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Codes</p>
                <div className="bg-black/5 rounded-lg p-3">
                  {formatCodes(transaction.payment_codes)}
                </div>
              </div>

              <div className="md:col-span-2">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Adresse de réception</p>
                <p className={`font-medium break-all ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {transaction.receiver_address}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}