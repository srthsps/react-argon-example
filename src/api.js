import axios from "axios";
// import Cookies from 'js-cookie'


const actionHandler = (payload) => {
	axios.defaults.headers.common['Content-Type'] = 'application/json';
	axios.defaults.headers.common['Accept'] = 'application/json';
	
	// const token = Cookies.get('token');
	// if (token) {
	// 	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	// }

	// axios.interceptors.request.use(request => {
	// 	console.log('Starting Request', JSON.stringify(request, null, 2))
	// 	return request
	// })

	

	return new Promise((resolve, reject) => {

		payload.baseURL = 'https://dev.enfono.com/api_downtown/api/v1/'

		axios(payload)
			.then(response => {
				let resp = response.data;
				if (response.status >= 200 && response.status < 300) {
					resolve(resp.data);
				} else {
					reject(resp.message);
				}
			})
			.catch(err => {
				axios.interceptors.request.use(request => {
					return request
				  })
				reject(getActionErrorMessage(err));
			});
	});
}

const getActionErrorMessage = (err) => {
	if (err.response?.data?.message) {
		return "Error: " + err.response.data.message;
	} else {
		return err;
	}
}

axios.interceptors.response.use(undefined, function(err) {
	var statusCode = err.status;
	if (statusCode == undefined) {

		// Server needs to specify CORS headers in the response
		// Basically `ACCESS-CONTROL-ALLOW-ORIGIN: *`
		// Otherwise, these kinda issues happen

		var lineSplit = err.toString().split('\n')[0].split(' ');
		statusCode = lineSplit[lineSplit.length - 1];
	}

	console.log("intercepter statuscode: ",statusCode)

	return new Promise(() => {
		if (statusCode == 401 && err.config && !err.config.__isRetryRequest) {
			// Got an unauthorized, logout the user
			// localStorage.removeItem("token")
			// Cookies.remove('token', {expires: 7, path: '/'})
			// history.push('login')
			// store.dispatch('logout');
			// store.commit('logout');
			// router.push('/login');

			// Vue.prototype.$notify({
			// 	title: "Unauthorized action detected",
			// 	icon: 'fa fa-exclamation-triangle',
			// 	type: 'danger',
			// 	message: 'Please login again to resync',
			// });
		}
		throw err;
	});
});


export default {
	baseURL: "https://dev.enfono.com/api_downtown/api/v1/",

	/* auth URLs */
	loginURL: "auth/login/", // [POST]
	logoutURL: "auth/logout/", // [POST]

	propertiesListURL: "administration/properties/?limit={limit}&offset={offset}",
	propertyDetailsURL: "administration/property/{id}/",
	propertyUnitListURL: 'administration/property/{property_id}/units/',
	propertyUnitDetailsURL: "administration/unit/{id}/",
	propertyUnitEditURL: "administration/unit/{id}/",
	propertyUnitTransactionListURL: "administration/unit/{unit_id}/transactions/",
	propertyUnitAgreementURL:"administration/unit/{unit_id}/agreement/",
	propertyStaffListURL: "administration/property/{property_id}/staffs/",
	usersListURL: 'administration/staffs/',
	userDetailsURL: 'administration/staff/{id}/',
	addUserURL: "administration/staffs/",
	editUserURL: "administration/staff/{id}/",
	tenantsListURL: "administration/tenants/",
	tenantsDetailsURL: "administration/tenant/{id}/",
	tenantProfileURL: "administration/tenant/{id}/profile/",
	tenantTransactionsURL: "administration/tenant/{tenant_id}/transactions/",
	addTenantsURL: "administration/tenants/?limit=100",
	editTenantsURL: "administration/tenant/{id}/",
	createRentalURL: "administration/rental/create/",
	categoryURL: "administration/property/categories/",
	sub_categoryURL:'administration/property/category/{category}/sub-categories/',
	createTenantRenatl: 'administration/rental/create/',
	assignPropertyToStaffURL: 'administration/assign-property-to-staff/',
	cardDataURL: "administration/dashboard/card-data/",
	recentTransactionListURL: "administration/dashboard/recent/rent-transactions/",
	transactionSummaryURL: "administration/rent-summary/?limit=100",
	transactionURL:"administration/transactions/?limit=100",
	propertyTransactionsURL: "administration/property/{property_id}/transactions/",
	resetPassword: "auth/password/reset/",
	pettyBalanceURL: "administration/property/{property_id}/petty-transfer/",
	propertyCardURL: "administration/property/{property_id}/card-data/",
	summaryCardURL:"administration/summary-card-data/",
	propertyTenantsListURL: "administration/property/{property_id}/tenants/",

    dummyURL: "http//localhost:4000/posts",

	
	actionHandler
};
