import React, { ChangeEvent } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface YearSelectProps {
  required: boolean;
  yearStart: number | null;
  placeholder: string;
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
}

const YearSelect: React.FC<YearSelectProps> = ({
  required,
  yearStart,
  placeholder,
  selectedYear,
  onYearChange,
}) => {
  const currentYear = new Date().getFullYear();
  const startYear = yearStart ?? 1900;

  const handleYearChange = (event: ChangeEvent<{ value: unknown }>) => {
    const year = event.target.value as number | null;
    onYearChange(year);
  };

  const renderYearOptions = () => {
    const years: number[] = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }
    return years.map((year) => (
      <MenuItem key={year} value={year}>
        {year}
      </MenuItem>
    ));
  };

  return (
    <Select
      color="secondary"
      required={required}
      sx={{ width: "100%" }}
      placeholder={placeholder}
      value={selectedYear ?? ""}
      onChange={handleYearChange as (event: SelectChangeEvent<number>) => void}
    >
      {renderYearOptions()}
    </Select>
  );
};

export default YearSelect;
