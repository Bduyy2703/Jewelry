import React, { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "./table.css";

const Table = ({ rows, columns, rowLink, setChecked }) => {
    const nav = useNavigate();
    const [formattedRows, setFormattedRow] = useState([]);
    useEffect(() => {
        setFormattedRow(
            rows.map((row) => {
                return {
                    ...row,
                    createdAt: format(row.createdAt, "dd MMM yyyy, h:mm a"),
                };
            })
        );
        document
            .querySelectorAll("input[type='checkbox']")
            .forEach((ckb) => (ckb.checked = false));
        setChecked([]);
    }, [rows]);

    const handleCheck = (e) => {
        e.stopPropagation();
        setChecked(
            Array.from(
                document.querySelectorAll("input[name='ckb-data']:checked")
            ).map((checkbox) => checkbox.value)
        );
    };

    const handleCheckAll = (e) => {
        const checked = e.target.checked;
        if (!checked) {
            document
                .querySelectorAll("input[name='ckb-data']")
                .forEach((ckb) => (ckb.checked = false));
            setChecked([]);
        } else {
            document
                .querySelectorAll("input[name='ckb-data']")
                .forEach((ckb) => (ckb.checked = true));
            setChecked(Array.from(formattedRows.map((row) => row._id)));
        }
    };

    return (
        <table className='card-table'>
            <thead>
                <tr>
                    <th>
                        <input
                            type='checkbox'
                            onClick={(e) => handleCheckAll(e)}
                        />
                    </th>
                    {columns.map((col) => (
                        <th key={col.key}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {formattedRows.length > 0 ? (
                    formattedRows.map((row, index) => (
                        <tr
                            key={index}
                            className='table-row'
                            onClick={() => nav(`${rowLink}/${row._id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <td>
                                <input
                                    type='checkbox'
                                    name='ckb-data'
                                    value={row._id}
                                    onClick={(e) => handleCheck(e)}
                                />
                            </td>
                            {columns.map((col) => (
                                <td key={col.key}>{row[col.key]}</td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan='2'>Không tìm thấy</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default memo(Table);
