
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export const PdfUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
    setIsDragActive(false);
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const removeFile = () => onFileSelect(null);

  return (
    <div className="space-y-4">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`transition-all duration-300 rounded-xl border-2 border-dashed backdrop-blur-md bg-white/10 dark:bg-black/20 p-8 text-center cursor-pointer hover:shadow-lg ${
            isDragActive ? 'border-primary/70 scale-[1.01]' : 'border-border/40'
          } animate-fade-in`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-foreground">
              {isDragActive ? "Drop your resume here!" : "Upload your resume"}
            </h4>
            <p className="text-muted-foreground">
              Drag & drop a PDF, or click to browse
            </p>
            <Button className="mt-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold hover:opacity-90">
              Browse Files
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl backdrop-blur-md bg-white/10 dark:bg-black/30 p-6 flex items-center justify-between animate-fade-in border border-white/10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-lime-500 flex items-center justify-center">
              <File className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground truncate max-w-[200px]">
                {selectedFile.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button size="sm" variant="ghost" onClick={removeFile} className="text-red-500 hover:bg-red-500/10">
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
