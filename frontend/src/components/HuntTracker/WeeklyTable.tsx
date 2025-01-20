import React from 'react';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import { PlayerWeeklyView, SearchType } from '@/types';
import { cn } from '@/utils/cn';

interface WeeklyTableProps {
  data: PlayerWeeklyView[];
  currentDay: number; // 0-6, representing Monday-Sunday
}

export default function WeeklyTable({ data, currentDay }: WeeklyTableProps) {
  const { t } = useTranslation('common');
  const [searchType, setSearchType] = useState<SearchType>('playerId');
  const [searchQuery, setSearchQuery] = useState('');

  // Memoize the days of the week array to prevent unnecessary re-renders
  const daysOfWeek = useMemo(() =>
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    []
  );

  // Filter data based on search criteria
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    return data.filter(player => {
      if (searchType === 'playerId') {
        return player.playerId.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return player.accounts.some(account =>
        account.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [data, searchQuery, searchType]);

  // Render cell with appropriate background color based on condition
  const renderPointsCell = (points: number | undefined | null, isPastDay: boolean, day: number) => {
    const isEmpty = points === undefined || points === null;
    const bgColor = isPastDay && isEmpty ? 'bg-gray-200' : '';

    return (
      <td key={`points-${day}`} className={cn('text-center p-2 border', bgColor)}>
        {isEmpty ? '-' : points}
      </td>
    );
  };

  // Render progress cells for the first account in a group
  const renderProgressCells = (player: PlayerWeeklyView, accountsLength: number) => (
    <>
      <td rowSpan={accountsLength} className="text-center border p-2">
        {player.weeklyProgress.totalPoints}
      </td>
      <td rowSpan={accountsLength} className="text-center border p-2">
        {player.weeklyProgress.goalPoints}
      </td>
      <td
        rowSpan={accountsLength}
        className={cn(
          'text-center border p-2',
          player.weeklyProgress.lastWeekDebt > 0 ? 'bg-red-200' : 'bg-green-200'
        )}
      >
        {player.weeklyProgress.lastWeekDebt}
      </td>
      <td
        rowSpan={accountsLength}
        className={cn(
          'text-center border p-2 font-bold',
          player.weeklyProgress.pointsToTrueGoal > 0 ? 'bg-green-200' :
          player.weeklyProgress.pointsToTrueGoal === 0 ? 'bg-blue-200' : 'bg-red-200'
        )}
      >
        {player.weeklyProgress.pointsToTrueGoal}
      </td>
    </>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Search Controls */}
      <div className="flex gap-2">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as SearchType)}
          className="rounded border p-2"
        >
          <option value="playerId">{t('search.memberId')}</option>
          <option value="name">{t('search.name')}</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('search.placeholder')}
          className="rounded border p-2 flex-1"
        />
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">{t('table.memberId')}</th>
              <th className="p-2 border">{t('table.name')}</th>
              {daysOfWeek.map((day) => (
                <th key={day} className="p-2 border">{t(`table.${day}`)}</th>
              ))}
              <th className="p-2 border">{t('table.totalPoints')}</th>
              <th className="p-2 border">{t('table.goalPoints')}</th>
              <th className="p-2 border">{t('table.lastWeekDebt')}</th>
              <th className="p-2 border">{t('table.pointsToGoal')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((player) => (
              // Use React.Fragment as container for each player's accounts
              <React.Fragment key={player.playerId}>
                {player.accounts.map((account, accountIndex) => (
                  <tr key={`${player.playerId}-${account.userId}-${accountIndex}`}>
                    {/* Player ID cell - only show for first account */}
                    {accountIndex === 0 && (
                      <td rowSpan={player.accounts.length} className="text-center border p-2">
                        {player.playerId}
                      </td>
                    )}

                    {/* Account name */}
                    <td className="border p-2">{account.name}</td>

                    {/* Daily hunt points */}
                    {[0, 1, 2, 3, 4, 5, 6].map((day) =>
                      renderPointsCell(
                        player.huntData[account.userId]?.[day],
                        day <= currentDay,
                        day
                      )
                    )}

                    {/* Progress cells - only show for first account */}
                    {accountIndex === 0 && renderProgressCells(player, player.accounts.length)}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}