import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { playChime } from '../constants';
import { Edit2, Check } from 'lucide-react';

interface Props {
  question: Question;
  index: number;
  onUpdate: (updatedQuestion: Question) => void;
  isEditMode: boolean;
}

const QuestionCard: React.FC<Props> = ({ question, index, onUpdate, isEditMode }) => {
  const [localOther, setLocalOther] = useState(question.otherText);
  const [isEditingText, setIsEditingText] = useState(false);
  const [editedText, setEditedText] = useState(question.text);
  const [editedOptions, setEditedOptions] = useState([...question.options]);

  useEffect(() => {
    setLocalOther(question.otherText);
  }, [question.otherText]);

  const handleOptionClick = (option: string) => {
    if (isEditMode) return; 
    playChime();

    const isSelected = question.selectedOptions.includes(option);
    let newOptions = [...question.selectedOptions];

    if (isSelected) {
      // Deselect
      newOptions = newOptions.filter(o => o !== option);
    } else {
      // Select
      newOptions.push(option);
    }

    onUpdate({
      ...question,
      selectedOptions: newOptions,
      // If "Other" was deselected, we keep the text but it becomes inactive conceptually
      otherText: option === 'Other' && !newOptions.includes('Other') ? localOther : question.otherText,
    });
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalOther(val);
    
    // Auto-select "Other" if the user starts typing
    if (!question.selectedOptions.includes('Other')) {
        onUpdate({
            ...question,
            selectedOptions: [...question.selectedOptions, 'Other'],
            otherText: val,
        });
    } else {
        onUpdate({
            ...question,
            otherText: val,
        });
    }
  };

  const saveEdits = () => {
    onUpdate({
      ...question,
      text: editedText,
      options: editedOptions,
    });
    setIsEditingText(false);
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6 shadow-xl relative overflow-hidden group hover:border-yellow-500/50 transition-all duration-300">
      
      {/* Edit Controls for Developer */}
      {isEditMode && (
        <div className="absolute top-2 right-2 z-10">
          {isEditingText ? (
            <button onClick={saveEdits} className="bg-green-600 p-1 rounded text-white"><Check size={16} /></button>
          ) : (
            <button onClick={() => setIsEditingText(true)} className="bg-blue-600 p-1 rounded text-white"><Edit2 size={16} /></button>
          )}
        </div>
      )}

      {/* Question Text */}
      <div className="mb-4">
        <span className="text-yellow-500 font-bold text-sm tracking-wider uppercase mb-1 block">Question {index + 1}</span>
        {isEditingText ? (
          <input 
            className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <h3 className="text-xl md:text-2xl font-serif text-white">{question.text}</h3>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, optIndex) => {
          const isSelected = question.selectedOptions.includes(option);
          return (
            <div 
                key={optIndex}
                onClick={() => handleOptionClick(option)}
                className={`
                relative flex items-center p-4 rounded-lg cursor-pointer border transition-all duration-200
                ${isSelected 
                    ? 'bg-yellow-900/30 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]' 
                    : 'bg-gray-800 border-gray-700 hover:border-gray-500 hover:bg-gray-750'}
                `}
            >
                <div className={`
                w-6 h-6 rounded border flex items-center justify-center mr-4 transition-colors flex-shrink-0
                ${isSelected ? 'bg-yellow-500 border-yellow-500' : 'border-gray-500'}
                `}>
                {isSelected && <Check size={16} className="text-black" />}
                </div>
                
                {isEditingText ? (
                <input 
                    className="w-full bg-gray-900 text-white p-1 rounded border border-gray-600 text-sm"
                    value={editedOptions[optIndex]}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                    const newOpts = [...editedOptions];
                    newOpts[optIndex] = e.target.value;
                    setEditedOptions(newOpts);
                    }}
                />
                ) : (
                <span className="text-gray-200">{option}</span>
                )}
            </div>
          );
        })}

        {/* Other Option */}
        <div 
            onClick={() => handleOptionClick('Other')}
            className={`
              relative flex items-center p-4 rounded-lg cursor-pointer border transition-all duration-200
              ${question.selectedOptions.includes('Other')
                ? 'bg-yellow-900/30 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]' 
                : 'bg-gray-800 border-gray-700 hover:border-gray-500 hover:bg-gray-750'}
            `}
          >
            <div className={`
              w-6 h-6 rounded border flex items-center justify-center mr-4 transition-colors flex-shrink-0
              ${question.selectedOptions.includes('Other') ? 'bg-yellow-500 border-yellow-500' : 'border-gray-500'}
            `}>
              {question.selectedOptions.includes('Other') && <Check size={16} className="text-black" />}
            </div>
            <div className="flex-1">
              <span className="text-gray-200 block mb-2">Other</span>
              <input 
                type="text" 
                placeholder="Type your alternative idea here..." 
                value={localOther}
                onClick={(e) => {
                   // Ensure clicking input also selects the option
                   if (!question.selectedOptions.includes('Other')) {
                       handleOptionClick('Other'); 
                   }
                }}
                onChange={handleOtherChange}
                className={`
                  w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 text-white outline-none py-1 transition-colors
                  ${!question.selectedOptions.includes('Other') ? 'opacity-50' : 'opacity-100'}
                `}
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
