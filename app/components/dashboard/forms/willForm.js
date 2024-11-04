'use client';
import React, { useState } from 'react';

const WillForm = () => {
    const [formData, setFormData] = useState({
        netWorth: '',
        H: 0,
        W: 0,
        S: 0,
        D: 0,
        SS: 0,
        SD: 0,
        SSS: 0,
        SSD: 0,
        F: 0,
        FF: 0,
        FFF: 0,
        FFFF: 0,
        FM: 0,
        M: 0,
        MM: 0,
        RB: 0,
        RS: 0,
        PB: 0,
        PS: 0,
        MT: 0,
        HM: 'no',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'netWorth' ? parseFloat(value) : parseInt(value, 10),
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitForm = async () => {
        try {
            const response = await fetch('https://336iykl1pe.execute-api.us-east-2.amazonaws.com/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            alert(`Calculation complete: ${JSON.stringify(result)}`);
        } catch (error) {
            console.error('Error:', error);
            alert('Error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>Sharia Will Calculator Survey</h1>
            <form id="survey-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="netWorth">Net Worth:</label>
                <input type="number" id="netWorth" name="netWorth" value={formData.netWorth} onChange={handleChange} required /><br /><br />

                <label htmlFor="H">Husband (H):</label>
                <input type="number" id="H" name="H" value={formData.H} onChange={handleChange} /><br /><br />

                <label htmlFor="W">Wife (W):</label>
                <input type="number" id="W" name="W" value={formData.W} onChange={handleChange} /><br /><br />

                <label htmlFor="S">Son (S):</label>
                <input type="number" id="S" name="S" value={formData.S} onChange={handleChange} /><br /><br />

                <label htmlFor="D">Daughter (D):</label>
                <input type="number" id="D" name="D" value={formData.D} onChange={handleChange} /><br /><br />

                <label htmlFor="SS">Son&apos;s Son (SS):</label>
                <input type="number" id="SS" name="SS" value={formData.SS} onChange={handleChange} /><br /><br />

                <label htmlFor="SD">Son&apos;s Daughter (SD):</label>
                <input type="number" id="SD" name="SD" value={formData.SD} onChange={handleChange} /><br /><br />

                <label htmlFor="SSS">Son&apos;s Son&apos;s Son (SSS):</label>
                <input type="number" id="SSS" name="SSS" value={formData.SSS} onChange={handleChange} /><br /><br />

                <label htmlFor="SSD">Son&apos;s Son&apos;s Daughter (SSD):</label>
                <input type="number" id="SSD" name="SSD" value={formData.SSD} onChange={handleChange} /><br /><br />

                <label htmlFor="F">Father (F):</label>
                <input type="number" id="F" name="F" value={formData.F} onChange={handleChange} /><br /><br />

                <label htmlFor="FF">Father&apos;s Father (FF):</label>
                <input type="number" id="FF" name="FF" value={formData.FF} onChange={handleChange} /><br /><br />

                <label htmlFor="FFF">Father&apos;s Father&apos;s Father (FFF):</label>
                <input type="number" id="FFF" name="FFF" value={formData.FFF} onChange={handleChange} /><br /><br />

                <label htmlFor="FFFF">Father&apos;s Father&apos;s Father&apos;s Father (FFFF):</label>
                <input type="number" id="FFFF" name="FFFF" value={formData.FFFF} onChange={handleChange} /><br /><br />

                <label htmlFor="FM">Father&apos;s Mother (FM):</label>
                <input type="number" id="FM" name="FM" value={formData.FM} onChange={handleChange} /><br /><br />

                <label htmlFor="M">Mother (M):</label>
                <input type="number" id="M" name="M" value={formData.M} onChange={handleChange} /><br /><br />

                <label htmlFor="MM">Mother&apos;s Mother (MM):</label>
                <input type="number" id="MM" name="MM" value={formData.MM} onChange={handleChange} /><br /><br />

                <label htmlFor="RB">Father&apos;s Brother&apos;s (RB):</label>
                <input type="number" id="RB" name="RB" value={formData.RB} onChange={handleChange} /><br /><br />

                <label htmlFor="RS">Father&apos;s Sister&apos;s (RS):</label>
                <input type="number" id="RS" name="RS" value={formData.RS} onChange={handleChange} /><br /><br />

                <label htmlFor="PB">Paternal Brother&apos;s (PB):</label>
                <input type="number" id="PB" name="PB" value={formData.PB} onChange={handleChange} /><br /><br />

                <label htmlFor="PS">Paternal Sister&apos;s (PS):</label>
                <input type="number" id="PS" name="PS" value={formData.PS} onChange={handleChange} /><br /><br />

                <label htmlFor="MT">Maternal Siblings (MT):</label>
                <input type="number" id="MT" name="MT" value={formData.MT} onChange={handleChange} /><br /><br />

                <label htmlFor="HM">Half-Maternal (HM):</label>
                <select id="HM" name="HM" value={formData.HM} onChange={handleSelectChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select><br /><br />

                <button type="button" onClick={submitForm}>Submit</button>
            </form>
        </div>
    );
};

export default WillForm;
