import * as React from 'react';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';

interface PropTypes {
  onUpload: (formData: FormData) => void;
  allowedMimeTypes: string[];
  fileSizeLimit: number;
  isLoading: boolean;
}

const FileUploader = (props: PropTypes) => {
  const { onUpload, allowedMimeTypes, fileSizeLimit, isLoading } = props;
  const [file, setFile] = React.useState<File>();

  const onFileAdd = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.length) {
      const currentFile = event.currentTarget.files[0];
      const fileSize = currentFile.size;

      if (fileSize > fileSizeLimit) {
        toast.error('File Size limit exceeded');
      }

      setFile(currentFile);
    }
  };

  const onSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('tags', file, file.name);
    await onUpload(formData);
    setFile(undefined);
  };

  return (
    <div className="callout m-8">
      {(!isLoading && (
        <div>
          <h3>Upload the csv file with tags you want to search</h3>
          <input type="file" name="tags" onChange={onFileAdd} accept={allowedMimeTypes[0]} />
        </div>
      )) || <ClipLoader />}
      <div>{file && `${file.name} - ${file.type}`}</div>
      <button className="button" onClick={onSubmit}>
        Upload
      </button>
    </div>
  );
};

export default FileUploader;
