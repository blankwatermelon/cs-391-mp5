type FormInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  helperText?: string;
};

export default function FormInput({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  helperText 
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-black mb-1">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
        required
      />
      {helperText && (
        <p className="text-xs font-bold text-black mt-1">{helperText}</p>
      )}
    </div>
  );
}