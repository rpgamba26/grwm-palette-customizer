import React, { useState } from 'react';
import { Calendar, MapPin, Mail, Download, Check, X } from 'lucide-react';

const PaletteCustomizer = () => {
  const [step, setStep] = useState('case-selection');
  const [selectedCase, setSelectedCase] = useState(null);
  const [panSize, setPanSize] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedPanType, setSelectedPanType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupBranch, setPickupBranch] = useState('');
  const [email, setEmail] = useState('');
  const [referenceCode, setReferenceCode] = useState('');

  const cases = [
    { id: 'gold', name: 'Gold Case', color: '#FFD700', image: 'https://images.unsplash.com/photo-1615397349754-5cb6d7a6e8ea?w=300&h=300&fit=crop' },
    { id: 'pink', name: 'Pink Case', color: '#FFB6C1', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop' }
  ];

  const panSizes = [
    { id: '6', name: '6 Pans', slots: 6 },
    { id: '4', name: '4 Pans', slots: 4 },
    { id: '1', name: '1 Pan', slots: 1 }
  ];

  const panTypes = [
    { id: 'full', name: '1 Full Pan', divisions: 1 },
    { id: 'quad', name: '4 Divisions', divisions: 4 },
    { id: 'dual', name: '2 Divisions (Vertical)', divisions: 2 }
  ];

  const categories = ['Blush On', 'Color Correction', 'Eye Shadow'];

  const paletteOptions = {
    'Blush On': [
      { id: 'b1', name: 'Peachy Glow', color: '#FFB380' },
      { id: 'b2', name: 'Rose Dust', color: '#E6A2A6' },
      { id: 'b3', name: 'Coral Sunset', color: '#FF7F6E' },
      { id: 'b4', name: 'Berry Kiss', color: '#D8738F' },
      { id: 'b5', name: 'Nude Pink', color: '#E8B5B5' },
      { id: 'b6', name: 'Terracotta', color: '#C76E4E' }
    ],
    'Color Correction': [
      { id: 'cc1', name: 'Green Corrector', color: '#A8D5A8' },
      { id: 'cc2', name: 'Peach Corrector', color: '#FFD4A3' },
      { id: 'cc3', name: 'Purple Corrector', color: '#D5B4E8' },
      { id: 'cc4', name: 'Yellow Corrector', color: '#FFF4A3' },
      { id: 'cc5', name: 'Orange Corrector', color: '#FFB366' },
      { id: 'cc6', name: 'Pink Corrector', color: '#FFB3D9' }
    ],
    'Eye Shadow': [
      { id: 'e1', name: 'Matte Brown', color: '#8B6B4F' },
      { id: 'e2', name: 'Shimmer Gold', color: '#D4AF37' },
      { id: 'e3', name: 'Deep Plum', color: '#6B4D6B' },
      { id: 'e4', name: 'Copper Glow', color: '#B87333' },
      { id: 'e5', name: 'Champagne', color: '#F7E7CE' },
      { id: 'e6', name: 'Smokey Grey', color: '#6B6B6B' },
      { id: 'e7', name: 'Burgundy', color: '#800020' },
      { id: 'e8', name: 'Rose Gold', color: '#B76E79' }
    ]
  };

  const branches = [
    'SM Mall of Asia', 'SM North EDSA', 'SM Megamall', 
    'Glorietta Makati', 'Trinoma', 'Alabang Town Center'
  ];

  const initializeSlots = (size) => {
    const newSlots = [];
    for (let i = 0; i < parseInt(size); i++) {
      newSlots.push({
        id: i,
        panType: null,
        selections: []
      });
    }
    setSlots(newSlots);
  };

  const handleCaseSelection = (caseId) => {
    setSelectedCase(caseId);
  };

  const handlePanSizeSelection = (size) => {
    setPanSize(size);
    initializeSlots(size);
    setStep('customization');
  };

  const handleSlotClick = (slotId) => {
    setSelectedSlot(slotId);
    setSelectedPanType(null);
    setSelectedCategory(null);
  };

  const handlePanTypeSelection = (panType) => {
    const updatedSlots = [...slots];
    updatedSlots[selectedSlot].panType = panType;
    updatedSlots[selectedSlot].selections = new Array(panTypes.find(p => p.id === panType).divisions).fill(null);
    setSlots(updatedSlots);
    setSelectedPanType(panType);
  };

  const handlePaletteSelection = (palette, divisionIndex = null) => {
    const updatedSlots = [...slots];
    if (divisionIndex !== null) {
      updatedSlots[selectedSlot].selections[divisionIndex] = palette;
    } else {
      updatedSlots[selectedSlot].selections[0] = palette;
    }
    setSlots(updatedSlots);
  };

  const handleDoubleClick = (slotId, divisionIndex = null) => {
    const updatedSlots = [...slots];
    if (divisionIndex !== null) {
      updatedSlots[slotId].selections[divisionIndex] = null;
    } else {
      updatedSlots[slotId].selections[0] = null;
    }
    setSlots(updatedSlots);
    setSelectedSlot(slotId);
  };

  const generateReferenceCode = () => {
    return 'GRWM-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleSaveCustomization = () => {
    setStep('pickup-selection');
  };

  const handlePickupSubmit = () => {
    const code = generateReferenceCode();
    setReferenceCode(code);
    setStep('review');
  };

  const handleEmailOnly = () => {
    const code = generateReferenceCode();
    setReferenceCode(code);
    setStep('email-sent');
  };

  const getSlotPosition = (index, total) => {
    if (total === 1) return { gridColumn: '1 / -1', gridRow: '1 / -1' };
    if (total === 4) {
      const positions = [
        { gridColumn: '1', gridRow: '1' },
        { gridColumn: '2', gridRow: '1' },
        { gridColumn: '1', gridRow: '2' },
        { gridColumn: '2', gridRow: '2' }
      ];
      return positions[index];
    }
    if (total === 6) {
      const positions = [
        { gridColumn: '1', gridRow: '1' },
        { gridColumn: '2', gridRow: '1' },
        { gridColumn: '3', gridRow: '1' },
        { gridColumn: '1', gridRow: '2' },
        { gridColumn: '2', gridRow: '2' },
        { gridColumn: '3', gridRow: '2' }
      ];
      return positions[index];
    }
  };

  if (step === 'case-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
            GRWM Customizable Palette Builder
          </h1>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Step 1: Choose Your Case</h2>
            <div className="grid grid-cols-2 gap-6">
              {cases.map(c => (
                <div
                  key={c.id}
                  onClick={() => handleCaseSelection(c.id)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${
                    selectedCase === c.id ? 'border-purple-500 shadow-lg scale-105' : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <img src={c.image} alt={c.name} className="w-full h-48 object-cover" />
                  <div className="p-4 text-center" style={{ backgroundColor: c.color + '20' }}>
                    <h3 className="font-semibold text-lg">{c.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedCase && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Step 2: Choose Pan Size</h2>
              <div className="grid grid-cols-3 gap-4">
                {panSizes.map(ps => (
                  <button
                    key={ps.id}
                    onClick={() => handlePanSizeSelection(ps.id)}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-lg transition-all"
                  >
                    {ps.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'customization') {
    const currentSlot = selectedSlot !== null ? slots[selectedSlot] : null;
    const selectedCaseInfo = cases.find(c => c.id === selectedCase);

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">
            Customize Your Palette
          </h1>

          <div className="grid grid-cols-2 gap-8">
            {/* Left Pane - Case Preview */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Your {selectedCaseInfo.name}</h2>
              <div 
                className="rounded-xl p-6 border-4"
                style={{ 
                  backgroundColor: selectedCaseInfo.color + '40',
                  borderColor: selectedCaseInfo.color
                }}
              >
                <div className={`grid gap-2 ${
                  panSize === '6' ? 'grid-cols-3 grid-rows-2' :
                  panSize === '4' ? 'grid-cols-2 grid-rows-2' :
                  'grid-cols-1 grid-rows-1'
                }`}>
                  {slots.map((slot, idx) => (
                    <div
                      key={slot.id}
                      onClick={() => handleSlotClick(slot.id)}
                      className={`border-2 rounded-lg cursor-pointer transition-all ${
                        selectedSlot === slot.id ? 'border-purple-500 shadow-lg scale-105' : 'border-gray-300 hover:border-purple-300'
                      }`}
                      style={getSlotPosition(idx, slots.length)}
                    >
                      {slot.panType ? (
                        <div className={`h-32 grid ${
                          slot.panType === 'full' ? 'grid-cols-1' :
                          slot.panType === 'quad' ? 'grid-cols-2 grid-rows-2 gap-0.5' :
                          'grid-rows-2 gap-0.5'
                        }`}>
                          {slot.selections.map((sel, divIdx) => (
                            <div
                              key={divIdx}
                              onDoubleClick={(e) => {
                                e.stopPropagation();
                                handleDoubleClick(slot.id, divIdx);
                              }}
                              className="flex items-center justify-center text-xs font-semibold p-1"
                              style={{ 
                                backgroundColor: sel ? sel.color : '#f0f0f0',
                                color: sel ? '#fff' : '#999'
                              }}
                            >
                              {sel ? sel.name : 'Empty'}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400">
                          Click to customize
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Pane - Customization Options */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Customization Panel</h2>
              
              {selectedSlot === null ? (
                <div className="text-center text-gray-500 py-12">
                  Select a slot from the case to start customizing
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Pan Type Selection */}
                  {!currentSlot.panType && (
                    <div>
                      <h3 className="font-semibold mb-3">Choose Pan Type</h3>
                      <div className="space-y-2">
                        {panTypes.map(pt => (
                          <button
                            key={pt.id}
                            onClick={() => handlePanTypeSelection(pt.id)}
                            className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold py-3 px-4 rounded-lg transition-all"
                          >
                            {pt.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Category and Palette Selection */}
                  {currentSlot.panType && (
                    <div>
                      <h3 className="font-semibold mb-3">Choose Category</h3>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                              selectedCategory === cat
                                ? 'bg-purple-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            {cat.split(' ')[0]}
                          </button>
                        ))}
                      </div>

                      {selectedCategory && (
                        <div>
                          <h3 className="font-semibold mb-3">Select Palette</h3>
                          <div className="max-h-96 overflow-y-auto space-y-2">
                            {paletteOptions[selectedCategory].map(palette => {
                              const emptyIndex = currentSlot.selections.findIndex(s => s === null);
                              return (
                                <button
                                  key={palette.id}
                                  onClick={() => handlePaletteSelection(palette, emptyIndex !== -1 ? emptyIndex : 0)}
                                  disabled={!currentSlot.selections.some(s => s === null)}
                                  className="w-full flex items-center gap-3 p-3 rounded-lg border-2 hover:border-purple-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <div
                                    className="w-12 h-12 rounded-lg border-2 border-gray-200"
                                    style={{ backgroundColor: palette.color }}
                                  />
                                  <span className="font-medium">{palette.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSaveCustomization}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-lg text-lg transition-all shadow-lg"
            >
              Save Customization & Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'pickup-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
              Pickup Details
            </h1>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-700">
                  <Calendar className="w-5 h-5" />
                  Select Pickup Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-700">
                  <MapPin className="w-5 h-5" />
                  Select Branch
                </label>
                <select
                  value={pickupBranch}
                  onChange={(e) => setPickupBranch(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Choose a branch...</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-700">
                  <Mail className="w-5 h-5" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handlePickupSubmit}
                  disabled={!pickupDate || !pickupBranch || !email}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all"
                >
                  Continue to Review
                </button>
                <button
                  onClick={handleEmailOnly}
                  disabled={!email}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all"
                >
                  Email Only (Pickup Later)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'review') {
    const selectedCaseInfo = cases.find(c => c.id === selectedCase);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
              <p className="text-gray-600">Your customization has been saved</p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Reference Code</h2>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-mono font-bold text-purple-700">{referenceCode}</div>
              </div>
              <div className="mt-4 flex justify-center">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <rect width="200" height="200" fill="white"/>
                    {[...Array(10)].map((_, i) => (
                      [...Array(10)].map((_, j) => (
                        <rect
                          key={`${i}-${j}`}
                          x={i * 20}
                          y={j * 20}
                          width="20"
                          height="20"
                          fill={(i + j) % 2 === 0 ? 'black' : 'white'}
                        />
                      ))
                    ))}
                  </svg>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Case:</span>
                  <span className="font-semibold">{selectedCaseInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pan Configuration:</span>
                  <span className="font-semibold">{panSize} Pans</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup Date:</span>
                  <span className="font-semibold">{pickupDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup Branch:</span>
                  <span className="font-semibold">{pickupBranch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold">{email}</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Your Customized Palette</h2>
              
              {/* Visual Case Preview */}
              <div 
                className="rounded-xl p-6 border-4 mb-6"
                style={{ 
                  backgroundColor: selectedCaseInfo.color + '40',
                  borderColor: selectedCaseInfo.color
                }}
              >
                <div className={`grid gap-2 ${
                  panSize === '6' ? 'grid-cols-3 grid-rows-2' :
                  panSize === '4' ? 'grid-cols-2 grid-rows-2' :
                  'grid-cols-1 grid-rows-1'
                }`}>
                  {slots.map((slot, idx) => (
                    <div
                      key={slot.id}
                      className="border-2 border-gray-300 rounded-lg"
                      style={getSlotPosition(idx, slots.length)}
                    >
                      {slot.panType ? (
                        <div className={`h-32 grid ${
                          slot.panType === 'full' ? 'grid-cols-1' :
                          slot.panType === 'quad' ? 'grid-cols-2 grid-rows-2 gap-0.5' :
                          'grid-rows-2 gap-0.5'
                        }`}>
                          {slot.selections.map((sel, divIdx) => (
                            <div
                              key={divIdx}
                              className="flex items-center justify-center text-xs font-semibold p-1 text-center"
                              style={{ 
                                backgroundColor: sel ? sel.color : '#f0f0f0',
                                color: sel ? '#fff' : '#999',
                                textShadow: sel ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
                              }}
                            >
                              {sel ? sel.name : 'Empty'}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400">
                          Empty Slot
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed List */}
              <h3 className="font-semibold mb-3 text-gray-700">Palette Details:</h3>
              <div className="grid gap-4">
                {slots.map((slot, idx) => (
                  <div key={slot.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="font-semibold mb-2">Slot {idx + 1}</div>
                    {slot.panType ? (
                      <div className="grid grid-cols-4 gap-2">
                        {slot.selections.map((sel, divIdx) => (
                          sel && (
                            <div key={divIdx} className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded border-2 border-gray-300"
                                style={{ backgroundColor: sel.color }}
                              />
                              <span className="text-sm">{sel.name}</span>
                            </div>
                          )
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">Empty</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-5 h-5" />
                Download/Print
              </button>
              <button
                onClick={() => {
                  setStep('case-selection');
                  setSelectedCase(null);
                  setPanSize(null);
                  setSlots([]);
                  setSelectedSlot(null);
                  setPickupDate('');
                  setPickupBranch('');
                  setEmail('');
                  setReferenceCode('');
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 rounded-lg transition-all"
              >
                Create New Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'email-sent') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sent to Email!</h1>
          <p className="text-gray-600 mb-6">
            Your customization details and reference code <span className="font-mono font-bold text-purple-600">{referenceCode}</span> have been sent to <span className="font-semibold">{email}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            You can use this code to complete your order and schedule pickup anytime.
          </p>
          <button
            onClick={() => {
              setStep('case-selection');
              setSelectedCase(null);
              setPanSize(null);
              setSlots([]);
              setSelectedSlot(null);
              setPickupDate('');
              setPickupBranch('');
              setEmail('');
              setReferenceCode('');
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-all"
          >
            Create Another Order
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default PaletteCustomizer;