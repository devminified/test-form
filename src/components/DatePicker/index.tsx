import { useState } from "react";
import RSelect from "../Select";
import { FormikProps } from "formik";
import './datepicker.scss'

interface IDatePicker {
  formik: FormikProps<TForm>;
}

const DatePicker: React.FC<IDatePicker> = ({ formik, ...props }) => {
  const {
    values,

    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    // tslint:disable-next-line: react-hooks-nesting
  } = formik;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const years = Array.from({ length: 100 }, (_, i) => ({
    value: 2022 - i,
    label: `${2022 - i}`,
  }));

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const handleMonthChange = (selectedOption: any) => {
    console.log(
      "🚀 ~ file: index.tsx:51 ~ handleMonthChange ~ selectedOption:",
      selectedOption
    );
    setSelectedMonth(selectedOption.value);
    setStartDate(null); // Reset the date when the month changes
  };

  const handleYearChange = (selectedOption: any) => {
    console.log(
      "🚀 ~ file: index.tsx:57 ~ handleYearChange ~ selectedOption:",
      selectedOption
    );
    setSelectedYear(selectedOption.value);
    setStartDate(null); // Reset the date when the year changes
  };

  const generateDaysOptions = () => {
    if (selectedMonth && selectedYear) {
      const days = daysInMonth(
        months.findIndex((month) => month.value === selectedMonth) + 1,
        selectedYear
      );
      return Array.from({ length: days }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}`,
      }));
    }
    return [];
  };

  return (
    <div className="text-input">
      <label>Birthdate</label>
      <div className="datepicker-holder">
        <RSelect
          options={generateDaysOptions()}
          placeholder="Day"
          isSearchable={false}
          value={
            startDate
              ? { label: String(startDate.getDate()), value: startDate.getDate() }
              : null
          }
          touched={touched.day}
          error={errors.day}
          onChange={(selectedOption: any) => {
            setStartDate(
              new Date(
                selectedYear || 0,
                months.findIndex((month) => month.value === selectedMonth) + 1,
                selectedOption.value
              )
            );
          }}
        />
        <RSelect
          touched={touched.month}
          error={errors.month}
          options={months}
          onBlur={(e: any) => {
            console.log("🚀 ~ file: index.tsx:96 ~ e:", e.target);

            // handleBlur
          }}
          onChange={handleMonthChange}
          placeholder="Month"
        />
        <RSelect
          touched={touched.year}
          error={errors.year}
          options={years}
          onChange={handleYearChange}
          placeholder="Year"
        />
      </div>
    </div>
  );
};

export default DatePicker;
