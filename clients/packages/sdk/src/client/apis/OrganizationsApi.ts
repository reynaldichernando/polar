/* tslint:disable */
/* eslint-disable */
/**
 * Polar API
 *  Welcome to the **Polar API** for [polar.sh](https://polar.sh).  This specification contains both the definitions of the Polar HTTP API and the Webhook API.  #### Authentication  Use a [Personal Access Token](https://polar.sh/settings) and send it in the `Authorization` header on the format `Bearer [YOUR_TOKEN]`.  #### Feedback  If you have any feedback or comments, reach out in the [Polar API-issue](https://github.com/polarsource/polar/issues/834), or reach out on the Polar Discord server.  We\'d love to see what you\'ve built with the API and to get your thoughts on how we can make the API better!  #### Connecting  The Polar API is online at `https://api.polar.sh`. 
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  CreditBalance,
  HTTPValidationError,
  ListResourceOrganization,
  ListResourceOrganizationCustomer,
  ListResourceOrganizationMember,
  Organization,
  OrganizationBadgeSettingsRead,
  OrganizationBadgeSettingsUpdate,
  OrganizationCustomerType,
  OrganizationSetAccount,
  OrganizationStripePortalSession,
  OrganizationUpdate,
  Platforms,
  ResourceNotFound,
} from '../models/index';

export interface OrganizationsApiCreateStripeCustomerPortalRequest {
    id: string;
}

export interface OrganizationsApiGetRequest {
    id: string;
}

export interface OrganizationsApiGetBadgeSettingsRequest {
    id: string;
}

export interface OrganizationsApiGetCreditsRequest {
    id: string;
}

export interface OrganizationsApiListRequest {
    isAdminOnly?: boolean;
}

export interface OrganizationsApiListMembersRequest {
    id: string | null;
}

export interface OrganizationsApiListOrganizationCustomersRequest {
    id: string;
    customerTypes?: Set<OrganizationCustomerType>;
    page?: number;
    limit?: number;
}

export interface OrganizationsApiLookupRequest {
    platform?: Platforms;
    organizationName?: string;
}

export interface OrganizationsApiSearchRequest {
    platform?: Platforms;
    organizationName?: string;
}

export interface OrganizationsApiSetAccountRequest {
    id: string;
    organizationSetAccount: OrganizationSetAccount;
}

export interface OrganizationsApiUpdateRequest {
    id: string;
    organizationUpdate: OrganizationUpdate;
}

export interface OrganizationsApiUpdateBadgeSettingsRequest {
    id: string;
    organizationBadgeSettingsUpdate: OrganizationBadgeSettingsUpdate;
}

/**
 * 
 */
export class OrganizationsApi extends runtime.BaseAPI {

    /**
     * Start a new Stripe Customer session for a organization.
     * Create Stripe Customer Portal
     */
    async createStripeCustomerPortalRaw(requestParameters: OrganizationsApiCreateStripeCustomerPortalRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrganizationStripePortalSession>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling createStripeCustomerPortal().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/organizations/{id}/stripe_customer_portal`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Start a new Stripe Customer session for a organization.
     * Create Stripe Customer Portal
     */
    async createStripeCustomerPortal(requestParameters: OrganizationsApiCreateStripeCustomerPortalRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrganizationStripePortalSession> {
        const response = await this.createStripeCustomerPortalRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a organization by ID
     * Get organization
     */
    async getRaw(requestParameters: OrganizationsApiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Organization>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling get().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/organizations/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get a organization by ID
     * Get organization
     */
    async get(requestParameters: OrganizationsApiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Organization> {
        const response = await this.getRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get badge settings (Internal API)
     */
    async getBadgeSettingsRaw(requestParameters: OrganizationsApiGetBadgeSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrganizationBadgeSettingsRead>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getBadgeSettings().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/organizations/{id}/badge_settings`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get badge settings (Internal API)
     */
    async getBadgeSettings(requestParameters: OrganizationsApiGetBadgeSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrganizationBadgeSettingsRead> {
        const response = await this.getBadgeSettingsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get credits for a organization
     * Get Credits
     */
    async getCreditsRaw(requestParameters: OrganizationsApiGetCreditsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreditBalance>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getCredits().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/organizations/{id}/credit`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get credits for a organization
     * Get Credits
     */
    async getCredits(requestParameters: OrganizationsApiGetCreditsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreditBalance> {
        const response = await this.getCreditsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List organizations that the authenticated user is a member of. Requires authentication.
     * List organizations
     */
    async listRaw(requestParameters: OrganizationsApiListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceOrganization>> {
        const queryParameters: any = {};

        if (requestParameters['isAdminOnly'] != null) {
            queryParameters['is_admin_only'] = requestParameters['isAdminOnly'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/organizations`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * List organizations that the authenticated user is a member of. Requires authentication.
     * List organizations
     */
    async list(requestParameters: OrganizationsApiListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceOrganization> {
        const response = await this.listRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List members of an organization. Requires authentication.
     * List members in an organization
     */
    async listMembersRaw(requestParameters: OrganizationsApiListMembersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceOrganizationMember>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling listMembers().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/organizations/{id}/members`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * List members of an organization. Requires authentication.
     * List members in an organization
     */
    async listMembers(requestParameters: OrganizationsApiListMembersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceOrganizationMember> {
        const response = await this.listMembersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List organization customers.
     * List Organization Customers
     */
    async listOrganizationCustomersRaw(requestParameters: OrganizationsApiListOrganizationCustomersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceOrganizationCustomer>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling listOrganizationCustomers().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['customerTypes'] != null) {
            queryParameters['customer_types'] = requestParameters['customerTypes'];
        }

        if (requestParameters['page'] != null) {
            queryParameters['page'] = requestParameters['page'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/organizations/{id}/customers`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * List organization customers.
     * List Organization Customers
     */
    async listOrganizationCustomers(requestParameters: OrganizationsApiListOrganizationCustomersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceOrganizationCustomer> {
        const response = await this.listOrganizationCustomersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Lookup a single organization.
     * Lookup organization
     */
    async lookupRaw(requestParameters: OrganizationsApiLookupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Organization>> {
        const queryParameters: any = {};

        if (requestParameters['platform'] != null) {
            queryParameters['platform'] = requestParameters['platform'];
        }

        if (requestParameters['organizationName'] != null) {
            queryParameters['organization_name'] = requestParameters['organizationName'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/organizations/lookup`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Lookup a single organization.
     * Lookup organization
     */
    async lookup(requestParameters: OrganizationsApiLookupRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Organization> {
        const response = await this.lookupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Search organizations.
     * Search organizations
     */
    async searchRaw(requestParameters: OrganizationsApiSearchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceOrganization>> {
        const queryParameters: any = {};

        if (requestParameters['platform'] != null) {
            queryParameters['platform'] = requestParameters['platform'];
        }

        if (requestParameters['organizationName'] != null) {
            queryParameters['organization_name'] = requestParameters['organizationName'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/organizations/search`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Search organizations.
     * Search organizations
     */
    async search(requestParameters: OrganizationsApiSearchRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceOrganization> {
        const response = await this.searchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Set organization account
     * Set organization organization
     */
    async setAccountRaw(requestParameters: OrganizationsApiSetAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Organization>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling setAccount().'
            );
        }

        if (requestParameters['organizationSetAccount'] == null) {
            throw new runtime.RequiredError(
                'organizationSetAccount',
                'Required parameter "organizationSetAccount" was null or undefined when calling setAccount().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/organizations/{id}/account`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['organizationSetAccount'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Set organization account
     * Set organization organization
     */
    async setAccount(requestParameters: OrganizationsApiSetAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Organization> {
        const response = await this.setAccountRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update organization
     * Update an organization
     */
    async updateRaw(requestParameters: OrganizationsApiUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Organization>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling update().'
            );
        }

        if (requestParameters['organizationUpdate'] == null) {
            throw new runtime.RequiredError(
                'organizationUpdate',
                'Required parameter "organizationUpdate" was null or undefined when calling update().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/organizations/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['organizationUpdate'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Update organization
     * Update an organization
     */
    async update(requestParameters: OrganizationsApiUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Organization> {
        const response = await this.updateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update badge settings (Internal API)
     */
    async updateBadgeSettingsRaw(requestParameters: OrganizationsApiUpdateBadgeSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Organization>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling updateBadgeSettings().'
            );
        }

        if (requestParameters['organizationBadgeSettingsUpdate'] == null) {
            throw new runtime.RequiredError(
                'organizationBadgeSettingsUpdate',
                'Required parameter "organizationBadgeSettingsUpdate" was null or undefined when calling updateBadgeSettings().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/organizations/{id}/badge_settings`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['organizationBadgeSettingsUpdate'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Update badge settings (Internal API)
     */
    async updateBadgeSettings(requestParameters: OrganizationsApiUpdateBadgeSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Organization> {
        const response = await this.updateBadgeSettingsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
