// Mock data for testing the frontend
export const mockServerTiming = {
  currentDateTime: new Date().toISOString(),
  nextHuntUpdate: new Date(new Date().setHours(5, 0, 0, 0)).toISOString(),
  latestHuntDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0]
};

export const mockHuntData = [
  {
    playerId: "P001",
    accounts: [
      {
        playerId: "P001",
        name: "MainPlayer1",
        active: true,
        isAlt: false,
        userId: "U001"
      },
      {
        playerId: "P001",
        name: "AltPlayer1",
        active: true,
        isAlt: true,
        userId: "U002"
      }
    ],
    weeklyProgress: {
      totalPoints: 150,
      goalPoints: 200,
      lastWeekDebt: 0,
      pointsToTrueGoal: -50
    },
    huntData: {
      "U001": [16, 16, 16, 16, 16, null, null],  // Monday to Sunday
      "U002": [14, 14, 14, 14, 14, null, null]
    }
  },
  {
    playerId: "P002",
    accounts: [
      {
        playerId: "P002",
        name: "MainPlayer2",
        active: true,
        isAlt: false,
        userId: "U003"
      }
    ],
    weeklyProgress: {
      totalPoints: 220,
      goalPoints: 200,
      lastWeekDebt: 0,
      pointsToTrueGoal: 20
    },
    huntData: {
      "U003": [20, 20, 20, 20, 20, null, null]
    }
  }
];