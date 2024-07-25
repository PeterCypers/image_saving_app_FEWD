import { isAxiosError } from 'axios';

export default function Error({ error }) {
  if (isAxiosError(error)) {
    return (
      <div className="alert alert-danger" data-cy="axios_error_message">
        <h4 className="alert-heading">Oops, something went wrong</h4>
        <p>
          {error.response.data?.message || error.message}
          {error.response.data?.details && Object.keys(error.response.data.details).length > 0 && (
            <>
              :
              <br />
              {formatJoiValidationErrorMessage(error.response.data.details.body)}
              {/* {JSON.stringify(error.response.data.details.body.password[0].message)} */}
              {/* {console.log(error.response.data.details.body.password)} */}
              {/* {JSON.stringify(error.response.data.details.body.password).substring(45 ,JSON.stringify(error.response.data.details.body.password).lastIndexOf(`"`))} */}
              {/* {JSON.stringify(Object.keys(error.response.data.details.body))} */}
              {/* {JSON.stringify(error.response.data.details.body.password)} */}
            </>
          )}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" data-cy="error_message">
        <h4 className="alert-heading">An unexpected error occured</h4>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  return null;
}

function formatJoiValidationErrorMessage(errMsg) {
  const removeQuotes = (str) => str.replace(/\\\"/g, '');
  if (errMsg.password){
    return removeQuotes(JSON.stringify(errMsg.password[0].message));
  }
  if (errMsg.email){
    return removeQuotes(JSON.stringify(errMsg.email[0].message));
  }
}