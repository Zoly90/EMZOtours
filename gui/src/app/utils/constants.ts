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
	public static CREDIT_CARD_EXPIRED_MESSAGE = 'You can not enter an expired credit card.'
	public static PASSWORD_NOT_EQUAL_MESSAGE = 'The passwords entered are not equal! Please check again.';
	public static INVALID_PASWORD_LENGTH_MESSAGE = 'The password must contain a minimum of 8 and a maximum of 32 characters.';
	public static INVALID_USERNAME_LENGTH_MESSAGE = 'The username must contain a minimum of 6 and a maximum of 32 characters.';
	public static INVALID_EMAIL_ADDRESS_MESSAGE = 'The e-mail address you entered is not valid.';
	public static INVALID_TELEPHONE_NUMBER_MESSAGE = 'The telephone number you entered is invalid.'

	// sign up form actions
	public static REGULAR_SIGN_UP = 'regular-sign-up';
	public static ADMIN_ADD_USER = 'add';
	public static ADMIN_EDIT_USER = 'edit';
	public static EDIT_MY_PROFILE = 'edit-my-profile';

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
	public static TITLES = [
		{
			value: 'title.mr',
			label: 'Mr.'
		},
		{
			value: 'title.ms',
			label: 'Ms.'
		},
		{
			value: 'title.mr',
			label: 'Mrs.'
		}
	];

	// days
	public static DAY_29 = { value: '29', label: '29' };
	public static DAY_30 = { value: '30', label: '30' };
	public static DAY_31 = { value: '31', label: '31' };

	// roles
	public static CLIENT = 'role.client';
	public static EMPLOYEE = 'role.employee';
	public static ADMIN = 'role.admin';

	// routes
	public static UNMATCHED_PATH = '**';
	public static HOME_PAGE_PATH = '';
	public static HOLIDAYS_MANAGEMENT_PAGE_PATH = 'holidays-management';
	public static USER_MANAGEMENT_PAGE_PATH = 'user-management';
	public static PERSONALIZED_OFFERS_MANAGEMENT_PAGE_PATH = 'personalized-offers-management'
	public static PERSONALIZED_OFFER_PAGE_PATH = 'personalized-offer';
	public static CONTACT_PAGE_PATH = 'contact';
	public static ABOUT_PAGE_PATH = 'about';
	public static HOLIDAY_DETAIL_VIEW_PAGE_PATH = 'holiday';
	public static HOLIDAY_LIST_VIEW_PAGE_PATH = 'holidays-list';

	// date select component action types
	public static BIRTHDATE = 'birthdate';
	public static ID_CARD_EXPIRATION_DATE = 'id-card-expiration-date';
	public static APPLY_FOR_OFFER = 'applyForOffer';

	// partail YouTube links
	public static YOU_TUBE_URL_FIRST_PART = 'https://www.youtube.com/embed/';
	public static YOU_TUBE_URL_SECOND_PART = '?enablejsapi=1';
}