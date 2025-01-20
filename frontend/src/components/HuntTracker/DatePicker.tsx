import { useTranslation } from 'next-i18next';
import { format, startOfWeek, subWeeks, addWeeks } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date | null) => void;
  isLoading?: boolean;
}

export function DatePicker({ selectedDate, onChange, isLoading }: DatePickerProps) {
  const { t } = useTranslation('common');

  // Always ensure we're working with the start of the week
  const currentWeekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });

  const handlePreviousWeek = () => {
    const newDate = subWeeks(currentWeekStart, 1);
    onChange(newDate);
  };

  const handleNextWeek = () => {
    const newDate = addWeeks(currentWeekStart, 1);
    onChange(newDate);
  };

  const handleCurrentWeek = () => {
    onChange(null);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={handlePreviousWeek}
        disabled={isLoading}
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <div className="flex gap-2 items-center">
        <span className="text-lg font-medium">
          {format(currentWeekStart, 'MMM dd, yyyy')}
        </span>
        <button
          onClick={handleCurrentWeek}
          disabled={isLoading}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {t('datePicker.currentWeek')}
        </button>
      </div>

      <button
        onClick={handleNextWeek}
        disabled={isLoading}
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}