const getErrorMessage = (error) => {
  switch (error) {
    case 'apiKeyDisabled':
    case 'apiKeyExhausted':
    case 'apiKeyInvalid':
    case 'apiKeyMissing':
      return 'Looks like we cannot connect to our news sources at the moment. Please try again and refresh the page.';
    case 'parameterInvalid':
    case 'parametersMissing':
      return `You've selected an invalid source or category. Please select from the menu and try again.`;
    case 'maximumResultsReached':
    case 'rateLimited':
      return 'We can only access our news sources on a limited rate. Chill for a bit and then try again.';
    case 'sourcesTooMany':
      return 'Whoa there! Just slow down for a bit before viewing too many news sources ok?';
    case 'sourceDoesNotExist':
      return `You've selected an invalid source. Click on the menu to see available news sources.`;
    case 'notFound':
    case 'unexpectedError':
    default:
      return `Something went horribly wrong here! I'm not sure what but it's scary stuff!`;
  }
}

export {
  getErrorMessage,
};
