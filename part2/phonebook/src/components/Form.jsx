const Form = ({ children, handleSubmit }) => {
  return <form onSubmit={handleSubmit}>{children}</form>;
};

export const Input = ({ label, value, id, placeholder, setValue }) => {
  return (
    <>
      <div>
        <label>{label}</label>
        <input
          id={id}
          type='text'
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </>
  );
};

export default Form;
