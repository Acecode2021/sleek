import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { ChevronRight, ChevronDown, Grid3X3, List, Mic, SlidersHorizontal, X } from 'lucide-react';
import DualRangeSlider from '../components/DualRangeSlider';
import VehicleCard from '../components/VehicleCard';
import {
  AutoCheckModal,
  AvailabilityModal,
  CompareModal,
  FeesDisclosureModal,
} from '../components/VehicleModals';
import { VEHICLES, formatCurrency, getVehicleUrl } from '../data/vehicles';

const DEFAULT_RECENT_STOCK = 'X79660'; // 2013 BMW 5 SERIES observed in reference sidebar

export default function Inventory({ specialOnly = false }) {
  const location = useLocation();
  const { makeSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter states initialized from URL search params
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [selectedMakes, setSelectedMakes] = useState(() => {
    const paramMake = searchParams.get('make') || (makeSlug ? makeSlug.toUpperCase() : '');
    return paramMake ? [paramMake.toUpperCase()] : [];
  });
  const [selectedModel, setSelectedModel] = useState(searchParams.get('model') || '');
  const [selectedBodyTypes, setSelectedBodyTypes] = useState(() => {
    const bt = searchParams.get('bodyType');
    return bt ? [bt.toUpperCase()] : [];
  });
  const [selectedDrivetrains, setSelectedDrivetrains] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [selectedHwyMpg, setSelectedHwyMpg] = useState('');
  const [selectedCityMpg, setSelectedCityMpg] = useState('');

  // Draft vs applied slider ranges (support both instant drag & UPDATE button)
  const initYearParam = Number(searchParams.get('year')) || null;
  const [yearMin, setYearMin] = useState(initYearParam || 2003);
  const [yearMax, setYearMax] = useState(initYearParam || 2024);

  const [mileageMin, setMileageMin] = useState(20000);
  const [mileageMax, setMileageMax] = useState(250000);

  const [priceMin, setPriceMin] = useState(Number(searchParams.get('minPrice')) || 10000);
  const [priceMax, setPriceMax] = useState(Number(searchParams.get('maxPrice')) || 65000);

  // Sync when URL query changes from header search / homepage / brand logos
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const mk = searchParams.get('make') || (makeSlug ? makeSlug.toUpperCase() : '');
    const md = searchParams.get('model') || '';
    const bt = searchParams.get('bodyType') || '';
    const yr = Number(searchParams.get('year')) || null;
    const minP = Number(searchParams.get('minPrice')) || 10000;
    const maxP = Number(searchParams.get('maxPrice')) || 65000;

    setKeyword(q);
    setSelectedMakes(mk ? [mk.toUpperCase()] : []);
    setSelectedModel(md);
    setSelectedBodyTypes(bt ? [bt.toUpperCase()] : []);
    setYearMin(yr || 2003);
    setYearMax(yr || 2024);
    setPriceMin(minP);
    setPriceMax(maxP);
    setPage(location.pathname.includes('page-2') ? 2 : 1);
  }, [searchParams, makeSlug, location.pathname]);

  // Toolbar & Pagination states
  const [pageSize, setPageSize] = useState(12);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('list');
  const [page, setPage] = useState(location.pathname.includes('page-2') ? 2 : 1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Open/Closed state of sidebar accordion sections
  const [openSections, setOpenSections] = useState({
    makeModel: false,
    drivetrain: false,
    exteriorColor: false,
    transmission: false,
    vehicleClass: false,
    bodyType: false,
    hwyMpg: false,
    cityMpg: false,
  });

  // Modals & Compare list
  const [availabilityVehicle, setAvailabilityVehicle] = useState(null);
  const [autoCheckVehicle, setAutoCheckVehicle] = useState(null);
  const [feesVehicle, setFeesVehicle] = useState(null);
  const [comparedStocks, setComparedStocks] = useState([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Recently Viewed vehicle from localStorage (defaults to observed 2013 BMW 5 SERIES)
  const recentVehicle = useMemo(() => {
    try {
      const saved = localStorage.getItem('sleek_recent_stock') || DEFAULT_RECENT_STOCK;
      return VEHICLES.find((v) => v.stockNumber === saved) || VEHICLES[18];
    } catch {
      return VEHICLES[18];
    }
  }, [location.key]);

  // Facet counts computed from full 20-vehicle dataset
  const facets = useMemo(() => {
    const countBy = (key) => {
      const counts = {};
      VEHICLES.forEach((v) => {
        counts[v[key]] = (counts[v[key]] || 0) + 1;
      });
      return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
    };
    return {
      makes: countBy('make'),
      drivetrains: countBy('drivetrain'),
      colors: countBy('exteriorColor'),
      transmissions: countBy('transmission'),
      classes: countBy('vehicleClass'),
      bodyTypes: countBy('bodyType'),
    };
  }, []);

  // Filtered + Sorted Vehicles
  const filteredVehicles = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    const list = VEHICLES.filter((v) => {
      if (specialOnly && !v.isSpecial) return false;
      if (v.year < yearMin || v.year > yearMax) return false;
      if (v.mileage < mileageMin || v.mileage > mileageMax) return false;
      if (v.price < priceMin || v.price > priceMax) return false;
      if (selectedMakes.length > 0 && !selectedMakes.includes(v.make)) return false;
      if (selectedModel && v.model !== selectedModel) return false;
      if (selectedBodyTypes.length > 0 && !selectedBodyTypes.includes(v.bodyType)) return false;
      if (selectedDrivetrains.length > 0 && !selectedDrivetrains.includes(v.drivetrain))
        return false;
      if (selectedColors.length > 0 && !selectedColors.includes(v.exteriorColor)) return false;
      if (selectedTransmissions.length > 0 && !selectedTransmissions.includes(v.transmission))
        return false;
      if (selectedHwyMpg) {
        const [minH, maxH] = selectedHwyMpg.split('-').map(Number);
        if (!v.hwyMpg || v.hwyMpg < minH || v.hwyMpg > maxH) return false;
      }
      if (selectedCityMpg) {
        const [minC, maxC] = selectedCityMpg.split('-').map(Number);
        if (!v.cityMpg || v.cityMpg < minC || v.cityMpg > maxC) return false;
      }
      if (q) {
        const hay = `${v.title} ${v.trim} ${v.stockNumber} ${v.vin} ${v.engine} ${v.exteriorColor} ${v.bodyType} ${v.fuelType}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...list];
    switch (sortBy) {
      case 'price_asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'miles_asc':
        sorted.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'miles_desc':
        sorted.sort((a, b) => b.mileage - a.mileage);
        break;
      case 'year_asc':
        sorted.sort((a, b) => a.year - b.year);
        break;
      case 'year_desc':
        sorted.sort((a, b) => b.year - a.year);
        break;
      case 'make_asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'make_desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        sorted.sort((a, b) => b.price - a.price || a.id - b.id);
    }
    return sorted;
  }, [
    specialOnly,
    keyword,
    yearMin,
    yearMax,
    mileageMin,
    mileageMax,
    priceMin,
    priceMax,
    selectedMakes,
    selectedModel,
    selectedBodyTypes,
    selectedDrivetrains,
    selectedColors,
    selectedTransmissions,
    selectedHwyMpg,
    selectedCityMpg,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredVehicles.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedVehicles = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredVehicles.slice(start, start + pageSize);
  }, [filteredVehicles, safePage, pageSize]);

  const toggleArrayValue = (arr, setter, val) => {
    setPage(1);
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const toggleAccordion = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedMakes([]);
    setSelectedModel('');
    setSelectedBodyTypes([]);
    setSelectedDrivetrains([]);
    setSelectedColors([]);
    setSelectedTransmissions([]);
    setSelectedHwyMpg('');
    setSelectedCityMpg('');
    setYearMin(2003);
    setYearMax(2024);
    setMileageMin(20000);
    setMileageMax(250000);
    setPriceMin(10000);
    setPriceMax(65000);
    setPage(1);
    setSearchParams({});
  };

  const handleToggleCompare = (vehicle) => {
    setComparedStocks((prev) =>
      prev.includes(vehicle.stockNumber)
        ? prev.filter((s) => s !== vehicle.stockNumber)
        : prev.length < 4
        ? [...prev, vehicle.stockNumber]
        : prev
    );
  };

  const comparedVehicles = useMemo(
    () => VEHICLES.filter((v) => comparedStocks.includes(v.stockNumber)),
    [comparedStocks]
  );

  return (
    <div className="inventory-page">
      <div className="page-title-band">
        <div className="container">
          <h1 className="page-main-heading">
            {specialOnly ? 'SPECIAL OFFER INVENTORY' : 'TRUCK SHOP'}
          </h1>
          {specialOnly && (
            <p style={{ margin: '8px 0 0', fontSize: 13, color: '#555' }}>
              Showing Featured Special vehicles from Sleek Auto Sales demonstration inventory.{' '}
              <Link to="/inventory" style={{ textDecoration: 'underline', fontWeight: 600 }}>
                View All 20 Vehicles
              </Link>
            </p>
          )}
        </div>
      </div>

      <div className="container">
        <button
          type="button"
          className="mobile-filter-toggle-btn"
          onClick={() => setMobileFiltersOpen((prev) => !prev)}
        >
          <SlidersHorizontal size={16} />
          {mobileFiltersOpen ? 'Hide Search Filters' : 'Show Search Filters'}
        </button>

        <div className="inventory-layout">
          {/* LEFT SIDEBAR: Search Filter + Recently Viewed */}
          <aside className={`inventory-sidebar ${mobileFiltersOpen ? 'is-open' : ''}`}>
            <h2 className="inventory-sidebar-heading">Search Filter</h2>

            {/* Year Range */}
            <div className="filter-group filter-group--slider">
              <div className="filter-slider-label">Year</div>
              <div className="filter-range-values">
                <span>{yearMin}</span>
                <span>{yearMax}</span>
              </div>
              <DualRangeSlider
                min={2003}
                max={2024}
                step={1}
                valueMin={yearMin}
                valueMax={yearMax}
                onChangeMin={(v) => {
                  setYearMin(v);
                  setPage(1);
                }}
                onChangeMax={(v) => {
                  setYearMax(v);
                  setPage(1);
                }}
                ariaLabelPrefix="Model year"
              />
              <div className="filter-update-row">
                <button type="button" className="pill-dark-btn" onClick={() => setPage(1)}>
                  UPDATE
                </button>
              </div>
            </div>

            {/* Make / Model */}
            <div className="filter-group">
              <button
                type="button"
                className="filter-accordion-btn"
                onClick={() => toggleAccordion('makeModel')}
              >
                <span>Make / Model</span>
                {openSections.makeModel ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </button>
              {(openSections.makeModel || selectedMakes.length > 0) && (
                <ul className="filter-options-list">
                  {facets.makes.map(([mk, cnt]) => (
                    <li key={mk} className="filter-option-item">
                      <label>
                        <span className="filter-option-left">
                          <input
                            type="checkbox"
                            checked={selectedMakes.includes(mk)}
                            onChange={() => {
                              setSelectedModel('');
                              toggleArrayValue(selectedMakes, setSelectedMakes, mk);
                            }}
                          />
                          <span>{mk}</span>
                        </span>
                        <span className="filter-count-badge">{cnt}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Mileage Range */}
            <div className="filter-group filter-group--slider">
              <div className="filter-slider-label">Mileage</div>
              <div className="filter-range-values">
                <span>{mileageMin.toLocaleString('en-US')}</span>
                <span>{mileageMax.toLocaleString('en-US')}</span>
              </div>
              <DualRangeSlider
                min={20000}
                max={250000}
                step={5000}
                valueMin={mileageMin}
                valueMax={mileageMax}
                onChangeMin={(v) => {
                  setMileageMin(v);
                  setPage(1);
                }}
                onChangeMax={(v) => {
                  setMileageMax(v);
                  setPage(1);
                }}
                ariaLabelPrefix="Vehicle mileage"
              />
              <div className="filter-update-row">
                <button type="button" className="pill-dark-btn" onClick={() => setPage(1)}>
                  UPDATE
                </button>
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-group filter-group--slider">
              <div className="filter-slider-label">Price Range</div>
              <div className="filter-range-values">
                <span>{formatCurrency(priceMin)}</span>
                <span>{formatCurrency(priceMax)}</span>
              </div>
              <DualRangeSlider
                min={10000}
                max={65000}
                step={1000}
                valueMin={priceMin}
                valueMax={priceMax}
                onChangeMin={(v) => {
                  setPriceMin(v);
                  setPage(1);
                }}
                onChangeMax={(v) => {
                  setPriceMax(v);
                  setPage(1);
                }}
                ariaLabelPrefix="Price range"
              />
              <div className="filter-update-row">
                <button type="button" className="pill-dark-btn" onClick={() => setPage(1)}>
                  UPDATE
                </button>
              </div>
            </div>

            {/* Drivetrain */}
            <div className="filter-group">
              <button
                type="button"
                className="filter-accordion-btn"
                onClick={() => toggleAccordion('drivetrain')}
              >
                <span>Drivetrain</span>
                {openSections.drivetrain ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </button>
              {(openSections.drivetrain || selectedDrivetrains.length > 0) && (
                <ul className="filter-options-list">
                  {facets.drivetrains.map(([dt, cnt]) => (
                    <li key={dt} className="filter-option-item">
                      <label>
                        <span className="filter-option-left">
                          <input
                            type="checkbox"
                            checked={selectedDrivetrains.includes(dt)}
                            onChange={() =>
                              toggleArrayValue(selectedDrivetrains, setSelectedDrivetrains, dt)
                            }
                          />
                          <span>{dt}</span>
                        </span>
                        <span className="filter-count-badge">{cnt}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Exterior Color */}
            <div className="filter-group">
              <button
                type="button"
                className="filter-accordion-btn"
                onClick={() => toggleAccordion('exteriorColor')}
              >
                <span>Exterior Color</span>
                {openSections.exteriorColor ? (
                  <ChevronDown size={15} />
                ) : (
                  <ChevronRight size={15} />
                )}
              </button>
              {(openSections.exteriorColor || selectedColors.length > 0) && (
                <ul className="filter-options-list">
                  {facets.colors.map(([clr, cnt]) => (
                    <li key={clr} className="filter-option-item">
                      <label>
                        <span className="filter-option-left">
                          <input
                            type="checkbox"
                            checked={selectedColors.includes(clr)}
                            onChange={() =>
                              toggleArrayValue(selectedColors, setSelectedColors, clr)
                            }
                          />
                          <span>{clr}</span>
                        </span>
                        <span className="filter-count-badge">{cnt}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Transmission */}
            <div className="filter-group">
              <button
                type="button"
                className="filter-accordion-btn"
                onClick={() => toggleAccordion('transmission')}
              >
                <span>Transmission</span>
                {openSections.transmission ? (
                  <ChevronDown size={15} />
                ) : (
                  <ChevronRight size={15} />
                )}
              </button>
              {(openSections.transmission || selectedTransmissions.length > 0) && (
                <ul className="filter-options-list">
                  {facets.transmissions.map(([tr, cnt]) => (
                    <li key={tr} className="filter-option-item">
                      <label>
                        <span className="filter-option-left">
                          <input
                            type="checkbox"
                            checked={selectedTransmissions.includes(tr)}
                            onChange={() =>
                              toggleArrayValue(
                                selectedTransmissions,
                                setSelectedTransmissions,
                                tr
                              )
                            }
                          />
                          <span>{tr}</span>
                        </span>
                        <span className="filter-count-badge">{cnt}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Vehicle Class */}
            <div className="filter-group">
              <button
                type="button"
                className="filter-accordion-btn"
                onClick={() => toggleAccordion('vehicleClass')}
              >
                <span>Vehicle Class</span>
                {openSections.vehicleClass ? (
                  <ChevronDown size={15} />
                ) : (
                  <ChevronRight size={15} />
                )}
              </button>
              {openSections.vehicleClass && (
                <ul className="filter-options-list">
                  {facets.classes.map(([vc, cnt]) => (
                    <li key={vc} className="filter-option-item">
                      <label>
                        <span className="filter-option-left">
                          <input type="checkbox" defaultChecked />
                          <span>{vc}</span>
                        </span>
                        <span className="filter-count-badge">{cnt}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Body Type */}
            <div className="filter-group">
              <button
                type="button"
                className="filter-accordion-btn"
                onClick={() => toggleAccordion('bodyType')}
              >
                <span>Body Type</span>
                {openSections.bodyType ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </button>
              {(openSections.bodyType || selectedBodyTypes.length > 0) && (
                <ul className="filter-options-list">
                  {facets.bodyTypes.map(([bt, cnt]) => (
                    <li key={bt} className="filter-option-item">
                      <label>
                        <span className="filter-option-left">
                          <input
                            type="checkbox"
                            checked={selectedBodyTypes.includes(bt)}
                            onChange={() =>
                              toggleArrayValue(selectedBodyTypes, setSelectedBodyTypes, bt)
                            }
                          />
                          <span>{bt}</span>
                        </span>
                        <span className="filter-count-badge">{cnt}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Highway MPG */}
            <div className="filter-group">
              <button
                type="button"
                className="filter-accordion-btn"
                onClick={() => toggleAccordion('hwyMpg')}
              >
                <span>Highway MPG</span>
                {openSections.hwyMpg ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </button>
              {openSections.hwyMpg && (
                <ul className="filter-options-list">
                  {[
                    { range: '15-20', label: '15 - 20', cnt: 7 },
                    { range: '20-25', label: '20 - 25', cnt: 3 },
                    { range: '25-30', label: '25 - 30', cnt: 2 },
                  ].map((item) => (
                    <li key={item.range} className="filter-option-item">
                      <label>
                        <span className="filter-option-left">
                          <input
                            type="checkbox"
                            checked={selectedHwyMpg === item.range}
                            onChange={() => {
                              setPage(1);
                              setSelectedHwyMpg(selectedHwyMpg === item.range ? '' : item.range);
                            }}
                          />
                          <span>{item.label}</span>
                        </span>
                        <span className="filter-count-badge">{item.cnt}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* City MPG */}
            <div className="filter-group">
              <button
                type="button"
                className="filter-accordion-btn"
                onClick={() => toggleAccordion('cityMpg')}
              >
                <span>City MPG</span>
                {openSections.cityMpg ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </button>
              {openSections.cityMpg && (
                <ul className="filter-options-list">
                  {[
                    { range: '10-15', label: '10 - 15', cnt: 6 },
                    { range: '15-20', label: '15 - 20', cnt: 5 },
                    { range: '20-25', label: '20 - 25', cnt: 1 },
                  ].map((item) => (
                    <li key={item.range} className="filter-option-item">
                      <label>
                        <span className="filter-option-left">
                          <input
                            type="checkbox"
                            checked={selectedCityMpg === item.range}
                            onChange={() => {
                              setPage(1);
                              setSelectedCityMpg(selectedCityMpg === item.range ? '' : item.range);
                            }}
                          />
                          <span>{item.label}</span>
                        </span>
                        <span className="filter-count-badge">{item.cnt}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="reset-filters-wrap">
              <button type="button" className="pill-dark-btn" onClick={handleResetFilters}>
                Reset Filters
              </button>
            </div>

            {/* Recently Viewed Card */}
            {recentVehicle && (
              <div className="recently-viewed-box">
                <h3 className="recently-viewed-title">Recently Viewed</h3>
                <Link to={getVehicleUrl(recentVehicle)} className="recently-viewed-card">
                  <div className="recently-viewed-img-wrap">
                    <img src={recentVehicle.images[0]} alt={recentVehicle.title} />
                    <div className="recently-viewed-price-tag">
                      <strong>{formatCurrency(recentVehicle.price)}*</strong>
                      <span>*Fees not disclosed</span>
                    </div>
                  </div>
                  <div className="recently-viewed-name">{recentVehicle.title}</div>
                </Link>
              </div>
            )}
          </aside>

          {/* RIGHT MAIN COLUMN: Toolbar + Vehicle Cards + Pagination */}
          <div>
            <div className="inventory-toolbar">
              <div className="keyword-search-box">
                <input
                  type="text"
                  className="keyword-search-input"
                  placeholder="Keyword Search"
                  aria-label="Keyword Search"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setPage(1);
                  }}
                />
                <Mic size={16} className="keyword-mic-icon" />
              </div>

              <div className="toolbar-controls-right">
                <div className="toolbar-inline-select">
                  <span>Page Size</span>
                  <select
                    aria-label="Page Size"
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setPage(1);
                    }}
                  >
                    <option value={9}>9 items</option>
                    <option value={12}>12 items</option>
                    <option value={18}>18 items</option>
                    <option value={24}>24 items</option>
                  </select>
                </div>

                <div className="toolbar-inline-select">
                  <span>Sort By</span>
                  <select
                    aria-label="Sort By"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="default">Default</option>
                    <option value="price_asc">Price: Low - High</option>
                    <option value="price_desc">Price: High - Low</option>
                    <option value="miles_asc">Miles: Low - High</option>
                    <option value="miles_desc">Miles: High - Low</option>
                    <option value="year_asc">Year: Old - New</option>
                    <option value="year_desc">Year: New - Old</option>
                    <option value="make_asc">Make: A-Z</option>
                    <option value="make_desc">Make: Z-A</option>
                  </select>
                </div>

                <button
                  type="button"
                  className={`view-mode-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                  onClick={() => setViewMode((m) => (m === 'list' ? 'grid' : 'list'))}
                  title={viewMode === 'list' ? 'Switch to Grid View' : 'Switch to List View'}
                  aria-label="Toggle inventory layout view"
                >
                  {viewMode === 'list' ? <Grid3X3 size={19} /> : <List size={19} />}
                </button>
              </div>
            </div>

            {filteredVehicles.length === 0 ? (
              <div style={{ padding: '44px 20px', textAlign: 'center', border: '1px solid #e5e5e5' }}>
                <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-condensed)', fontSize: 22 }}>
                  No Matching Demonstration Vehicles Found
                </h3>
                <p style={{ color: '#555', margin: '0 0 18px' }}>
                  Adjust your filters or reset search criteria to view all 20 vehicles in stock.
                </p>
                <button type="button" className="pill-dark-btn" onClick={handleResetFilters}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className={viewMode === 'grid' ? 'vlp-grid' : 'vlp-list'}>
                  {paginatedVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.stockNumber}
                      vehicle={vehicle}
                      variant={viewMode}
                      isCompared={comparedStocks.includes(vehicle.stockNumber)}
                      onToggleCompare={handleToggleCompare}
                      onConfirmAvailability={(v) => setAvailabilityVehicle(v)}
                      onOpenAutoCheck={(v) => setAutoCheckVehicle(v)}
                      onOpenFeesInfo={(v) => setFeesVehicle(v)}
                    />
                  ))}
                </div>

                <div className="vlp-pagination-bar">
                  <div>
                    Page {safePage} of {totalPages} ({filteredVehicles.length} vehicles)
                  </div>
                  <div className="vlp-page-buttons">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`vlp-page-btn ${safePage === num ? 'is-active' : ''}`}
                        onClick={() => {
                          setPage(num);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        {num}
                      </button>
                    ))}
                    {safePage < totalPages && (
                      <button
                        type="button"
                        className="vlp-page-btn"
                        aria-label="Next page"
                        onClick={() => {
                          setPage(safePage + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Floating Vehicle Comparison Bar */}
      {comparedVehicles.length > 0 && (
        <div className="compare-floating-bar">
          <div className="container compare-floating-inner">
            <div className="compare-pills">
              <strong>Compare ({comparedVehicles.length}/4):</strong>
              {comparedVehicles.map((v) => (
                <span key={v.stockNumber} className="compare-chip">
                  {v.year} {v.make} {v.model}
                  <button
                    type="button"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                    }}
                    onClick={() => handleToggleCompare(v)}
                    aria-label={`Remove ${v.title}`}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                className="pill-dark-btn"
                style={{ background: 'var(--color-hero-red)' }}
                onClick={() => setCompareModalOpen(true)}
              >
                Compare Selected
              </button>
              <button
                type="button"
                className="pill-dark-btn"
                onClick={() => setComparedStocks([])}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      <AvailabilityModal
        vehicle={availabilityVehicle}
        mode="availability"
        onClose={() => setAvailabilityVehicle(null)}
      />
      <AutoCheckModal vehicle={autoCheckVehicle} onClose={() => setAutoCheckVehicle(null)} />
      <FeesDisclosureModal vehicle={feesVehicle} onClose={() => setFeesVehicle(null)} />
      {compareModalOpen && (
        <CompareModal vehicles={comparedVehicles} onClose={() => setCompareModalOpen(false)} />
      )}
    </div>
  );
}
