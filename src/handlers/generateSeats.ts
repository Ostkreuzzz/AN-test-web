export const generateSeats = (rows: number, cols: number, setSeats: (value: boolean[][]) => void) => {
  const newSeats = Array.from(
    { length: rows },
    () => Array.from({ length: cols }, () => Math.random() < 0.3), // 30% occupancy rate
  );
  setSeats(newSeats);
};
