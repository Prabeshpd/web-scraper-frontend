import * as React from 'react';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';

interface PropTypes {
  onUpload: (tags: string[]) => void;
  allowedMimeTypes: string[];
  csvKeyCountLimit: number;
  isLoading: boolean;
}

const FileUploader = (props: PropTypes) => {
  const { onUpload, allowedMimeTypes, csvKeyCountLimit, isLoading } = props;
  const [tags, setTags] = React.useState<string[]>([]);
  const [file, setFile] = React.useState<File>();

  const onFileAdd = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.length) {
      const currentFile = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target?.result;

        if (!text || typeof text !== 'string') {
          toast.error('Unable to upload the file');
          return;
        }

        const rows = text.split('\n');
        if (!rows[rows.length - 1]) rows.pop();

        if (rows.length >= csvKeyCountLimit) {
          toast.error(`Keys can not be greater than ${csvKeyCountLimit}`);
          return;
        }

        if (!rows.length) {
          toast.error('csv file must contain keys to search');
          return;
        }

        setTags(rows);
      };
      reader.readAsText(currentFile);
      setFile(currentFile);
    }
  };

  const onSubmit = async () => {
    if (!tags.length) return;

    await onUpload(tags);
    setTags([]);
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
