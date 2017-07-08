export class TurismAppConstants {

	/**
	 * Error messages
	 */
	// login and reset password
	public static WRONG_CREDENTIALS = 'Username and/or password are incorect, please try again!';
	public static RESET_PASSWORD_USERNAME_EXISTS = 'An e-mail was sent to your mailbox. Please check your inbox and your spam folder too.';
	public static RESET_PASSWORD_USERNAME_NOT_EXISTS = 'The username you entered is not in our database. Please try another user or create a new account.';

	// sign up form
	public static NOT_OVER_18_MESSAGE = 'You must be at least 18 years old to create an account.';
	public static PASSWORD_NOT_EQUAL_MESSAGE = 'The passwords entered are not equal! Please check again.';
	public static INVALID_PASWORD_LENGTH_MESSAGE = 'The password must contain a minimum of 8 and a maximum of 32 characters.';
	public static INVALID_USERNAME_LENGTH_MESSAGE = 'The username must contain a minimum of 6 and a maximum of 32 characters.';
	public static INVALID_EMAIL_ADDRESS_MESSAGE = 'The e-mail address you entered is not valid.';

	/**
	 * 
	 */
	// first year of birth
	public static FIRST_YEAR = 1930;

	// 1 day = 0.00273791 years
	public static DAY_TO_YEAR_CONVERSION = 0.00273791;

	// months of a year
	public static MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	// initial number of days
	public static NUMBER_OF_DAYS = 28;

	// titles
	public static TITLES = ['Mr.', 'Ms.', 'Mrs.'];

	// days
	public static DAY_29 = { value: "28", label: "29" };
	public static DAY_30 = { value: "29", label: "30" };
	public static DAY_31 = { value: "30", label: "31" };

	// roles
	public static CLIENT = 'CLIENT';
	public static EMPLOYEE = 'EMPLOYEE';
	public static ADMIN = 'ADMIN';
}