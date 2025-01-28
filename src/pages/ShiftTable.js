import React from 'react';

const ShiftTable = ({ shifts }) => {
  return (
    <div className="shift-table-container">
      <table>
        <thead>
          <tr>
            {/* سرفصل‌های جدول */}
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift, index) => (
            <tr key={index}>
              {/* داده‌های شیفت‌ها */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftTable;