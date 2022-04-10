/**
* Title on a page.
*
*/
const PageTitle: React.FC<{}> = ({ children }) => {
  return (
    <div className="text-center w-full pb-7 md:pb-12">
      <h2 className="w-3/6 m-auto block max-w-full text-2xl font-bold text-green-500 mt-5 md:mt-8">
        {children}
      </h2>
    </div>
  );
};

export default PageTitle;
