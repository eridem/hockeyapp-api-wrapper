'use strict';

declare module HockeyAppModels {
    export enum Status {
        NonDownloable = 1,
        Downloable = 2
    }

    export enum ReleaseType {
        Beta = 0,
        Store = 1,
        Alpha = 2,
        Enterprise = 3
    }

    export interface IApp {
        id: number;
        title: string;
        bundle_identifier: string;
        public_identifier: string;
        device_family: string;
        minimum_os_version: string;
        release_type: ReleaseType;
        status: Status;
        platform: string;
        role: number;
        featured: boolean;
        created_at: Date;
        updated_at: Date;
        custom_release_type: string;
        visibility: string;
        owner: string;
        owner_token: string;
        company: string;
    }

    export interface IVersion {
        id: number;
        version: string;
        mandatory: boolean;
        config_url: string;
        download_url: string;
        timestamp: number;
        appsize: number;
        device_family: string;
        notes: string;
        shortversion: string;
        minimum_os_version: string;
        title: string;
        external: boolean;
        app_id: number;
        restricted_to_tags: boolean;
        status: Status;
        tags: Array<string>;
        expired_at: Date;
        created_at: Date;
        updated_at: Date;
        sdk_version: string;
        block_crashes: boolean;
        app_owner: string;
    }

    export interface IAppResponse {
        apps: Array<IApp>;
        status: string;
    }

    export interface IVersionResponse {
        app_versions: Array<IVersion>;
        status: string;
    }
}