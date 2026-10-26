import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCw } from 'lucide-react';
import DualRangeSlider from './DualRangeSlider';
import { VEHICLES, formatCurrency } from '../data/vehicles';

const MAKES = ['BMW', 'CHEVROLET', 'FORD', 'GMC', 'NISSAN', 'RAM'];
const BODY_TYPES = ['COUPE', 'PICKUP', 'SEDAN', 'SUV'];
const YEARS = [2024, 2023, 2022, 2021, 2019, 2017, 2015, 2013, 2012, 2006, 2003];

export default function InventorySearch() {
  const navigate = useNavigate();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [year, setYear] = useState('');
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(65000);

  const availableModels = useMemo(() => {
    const filtered = make ? VEHICLES.filter((v) => v.make === make) : VEHICLES;
    return Array.from(new Set(filtered.map((v) => v.model))).sort();
  }, [make]);

  const handleReset = () => {
    setMake('');
    setModel('');
    setBodyType('');
    setYear('');
    setMinPrice(10000);
    setMaxPrice(65000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.set('make', make);
    if (model) params.set('model', model);
    if (bodyType) params.set('bodyType', bodyType);
    if (year) params.set('year', year);
    if (minPrice > 10000) params.set('minPrice', String(minPrice));
    if (maxPrice < 65000) params.set('maxPrice', String(maxPrice));
    const qs = params.toString();
    navigate(qs ? `/inventory?${qs}` : '/inventory');
  };

  return (
    <section className="home-search-wrapper" aria-label="Search Vehicle Inventory">
      <div className="container">
        <form className="home-search-box" onSubmit={handleSubmit}>
          <div className="home-search-grid">
            {/* Row 1 Col 1: MAKE */}
            <div className="home-search-field">
              <label htmlFor="home-make">MAKE</label>
              <select
                id="home-make"
                className="home-select"
                value={make}
                onChange={(e) => {
                  setMake(e.target.value);
                  setModel('');
                }}
              >
                <option value="">Select an option</option>
                {MAKES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 1 Col 2: MODEL */}
            <div className="home-search-field">
              <label htmlFor="home-model">MODEL</label>
              <select
                id="home-model"
                className="home-select"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="">Select an option</option>
                {availableModels.map((mod) => (
                  <option key={mod} value={mod}>
                    {mod}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 1 Col 3: PRICE */}
            <div className="home-search-field">
              <div className="home-price-header">
                <span>PRICE</span>
                <span>
                  {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
                </span>
              </div>
              <div className="home-price-slider-wrap">
                <DualRangeSlider
                  min={10000}
                  max={65000}
                  step={1000}
                  valueMin={minPrice}
                  valueMax={maxPrice}
                  onChangeMin={setMinPrice}
                  onChangeMax={setMaxPrice}
                  variant="dark"
                  ariaLabelPrefix="Vehicle price"
                />
              </div>
            </div>

            {/* Row 2 Col 1: BODY TYPE */}
            <div className="home-search-field">
              <label htmlFor="home-body-type">BODY TYPE</label>
              <select
                id="home-body-type"
                className="home-select"
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
              >
                <option value="">Select an option</option>
                {BODY_TYPES.map((bt) => (
                  <option key={bt} value={bt}>
                    {bt}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 2 Col 2: YEAR */}
            <div className="home-search-field">
              <label htmlFor="home-year">YEAR</label>
              <select
                id="home-year"
                className="home-select"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Select an option</option>
                {YEARS.map((yr) => (
                  <option key={yr} value={String(yr)}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 2 Col 3: SEARCH + RESET */}
            <div className="home-search-actions">
              <button type="submit" className="home-search-btn">
                SEARCH
              </button>
              <button
                type="button"
                className="home-reset-btn"
                onClick={handleReset}
                aria-label="Reset search filters"
                title="Reset filters"
              >
                <RotateCw size={15} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
