'use client';

import { useState, useRef } from 'react';
import { UploadCloud, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropZoneProps {
  onFileSelect?: (file: File | null) => void;
  className?: string;
}

export function DropZone({ onFileSelect, className }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        handleFile(droppedFile);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (newFile: File) => {
    setFile(newFile);
    if (onFileSelect) onFileSelect(newFile);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (onFileSelect) onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden',
        isDragging
          ? 'border-accent bg-accent/5'
          : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10',
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleChange}
      />

      {file ? (
        <div className="flex flex-col items-center gap-4 text-center p-6 animate-fade-in z-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 text-success">
            <File size={32} />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{file.name}</p>
            <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button
            onClick={removeFile}
            className="mt-2 flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-danger/20 hover:text-red-400"
          >
            <X size={16} />
            ลบไฟล์นี้
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center p-8 z-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/20 group-hover:text-accent">
            <UploadCloud size={32} />
          </div>
          <div>
            <p className="text-lg font-semibold text-white mb-1">ลากไฟล์ PDF มาวางที่นี่</p>
            <p className="text-sm text-gray-400">หรือคลิกเพื่อเลือกไฟล์จากเครื่อง</p>
          </div>
        </div>
      )}
      
      {/* Decorative background animation */}
      {!file && (
        <div className="absolute inset-0 z-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-shimmer pointer-events-none" />
      )}
    </div>
  );
}
