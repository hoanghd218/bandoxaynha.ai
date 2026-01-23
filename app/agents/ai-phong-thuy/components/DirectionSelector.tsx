"use client";

import React from 'react';
import { Direction, DIRECTIONS } from '@/data/fengshui';

interface DirectionSelectorProps {
    selected: Direction | null;
    onSelect: (direction: Direction) => void;
}

const DirectionButton = ({ dir, isSelected, onClick }: { dir: Direction; isSelected: boolean; onClick: () => void }) => {
    const dirConfig = DIRECTIONS.find(d => d.label === dir);

    return (
        <button
            onClick={onClick}
            role="radio"
            aria-checked={isSelected}
            aria-label={`Hướng ${dir}`}
            className={`
                h-20 min-h-[80px] rounded-xl
                flex flex-col items-center justify-center gap-2
                border-2 transition-all cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                md:w-24 md:min-w-[100px]
                w-full
                ${isSelected
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-primary/50 hover:scale-105'
                }
            `}
            style={{
                backgroundColor: isSelected ? dirConfig?.color : undefined,
                borderColor: isSelected ? dirConfig?.color : undefined,
            }}
        >
            <span className="text-sm font-semibold">{dir}</span>
            <span className="text-xs opacity-80">
                {dir === 'Bắc' && 'N'}
                {dir === 'Đông' && 'E'}
                {dir === 'Nam' && 'S'}
                {dir === 'Tây' && 'W'}
                {dir === 'Đông Bắc' && 'NE'}
                {dir === 'Đông Nam' && 'SE'}
                {dir === 'Tây Nam' && 'SW'}
                {dir === 'Tây Bắc' && 'NW'}
            </span>
            {isSelected && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            )}
        </button>
    );
};

const CenterIndicator = ({ selected }: { selected: Direction | null }) => {
    return (
        <div className="h-20 flex flex-col items-center justify-center bg-white border-2 border-gray-100 rounded-xl md:w-24 w-full">
            {selected ? (
                <>
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-lg"
                        style={{
                            backgroundColor: DIRECTIONS.find(d => d.label === selected)?.color,
                        }}
                    >
                        ✓
                    </div>
                    <span className="text-sm font-semibold text-gray-900 mt-1">
                        {selected}
                    </span>
                </>
            ) : (
                <>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-lg">
                        ?
                    </div>
                    <span className="text-xs text-gray-500 mt-1 text-center px-2">
                        Chọn hướng
                    </span>
                </>
            )}
        </div>
    );
};

export default function DirectionSelector({ selected, onSelect }: DirectionSelectorProps) {
    return (
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full" role="radiogroup" aria-label="Chọn hướng nhà">
                {/* Row 1: North directions */}
                <DirectionButton
                    dir="Đông Bắc"
                    isSelected={selected === 'Đông Bắc'}
                    onClick={() => onSelect('Đông Bắc')}
                />
                <DirectionButton
                    dir="Bắc"
                    isSelected={selected === 'Bắc'}
                    onClick={() => onSelect('Bắc')}
                />
                <DirectionButton
                    dir="Đông Nam"
                    isSelected={selected === 'Đông Nam'}
                    onClick={() => onSelect('Đông Nam')}
                />

                {/* Row 2: West - Center - East */}
                <DirectionButton
                    dir="Tây Bắc"
                    isSelected={selected === 'Tây Bắc'}
                    onClick={() => onSelect('Tây Bắc')}
                />
                <CenterIndicator selected={selected} />
                <DirectionButton
                    dir="Tây Nam"
                    isSelected={selected === 'Tây Nam'}
                    onClick={() => onSelect('Tây Nam')}
                />

                {/* Row 3: South directions */}
                <DirectionButton
                    dir="Tây"
                    isSelected={selected === 'Tây'}
                    onClick={() => onSelect('Tây')}
                />
                <DirectionButton
                    dir="Nam"
                    isSelected={selected === 'Nam'}
                    onClick={() => onSelect('Nam')}
                />
                <DirectionButton
                    dir="Đông"
                    isSelected={selected === 'Đông'}
                    onClick={() => onSelect('Đông')}
                />
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
                {selected ? `Đã chọn: ${selected}` : 'Nhấn vào hướng nhà của bạn'}
            </p>
        </div>
    );
}
