/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IRemoteAgentConnection, IRemoteAgentService } from 'vs/workbench/services/remote/common/remoteAgentService';
import { IRemoteAuthorityResolverService } from 'vs/platform/remote/common/remoteAuthorityResolver';
import product from 'vs/platform/product/common/product';
import { nodeSocketFactory } from 'vs/platform/remote/node/nodeSocketFactory';
import { AbstractRemoteAgentService, RemoteAgentConnection } from 'vs/workbench/services/remote/common/abstractRemoteAgentService';
import { ISignService } from 'vs/platform/sign/common/sign';
import { ISocketFactory } from 'vs/platform/remote/common/remoteAgentConnection';
import { ILogService } from 'vs/platform/log/common/log';
import { IWorkbenchEnvironmentService } from 'vs/workbench/services/environment/common/environmentService';

export class RemoteAgentService extends AbstractRemoteAgentService implements IRemoteAgentService {

	public readonly socketFactory: ISocketFactory;

	private readonly _connection: IRemoteAgentConnection | null = null;

	constructor(
		@IWorkbenchEnvironmentService environmentService: IWorkbenchEnvironmentService,
		@IRemoteAuthorityResolverService remoteAuthorityResolverService: IRemoteAuthorityResolverService,
		@ISignService signService: ISignService,
		@ILogService logService: ILogService
	) {
		super(environmentService);
		this.socketFactory = nodeSocketFactory;
		if (environmentService.configuration.remoteAuthority) {
			this._connection = this._register(new RemoteAgentConnection(environmentService.configuration.remoteAuthority, product.commit, nodeSocketFactory, remoteAuthorityResolverService, signService, logService));
		}
	}

	getConnection(): IRemoteAgentConnection | null {
		return this._connection;
	}
}
