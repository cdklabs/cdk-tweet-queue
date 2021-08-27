import { DynamoDB } from 'aws-sdk';
export interface CheckpointTableOptions {
    /**
     * DynamoDB client.
     * @default The default client
     **/
    dynamodb?: DynamoDB;
    /**
     * Table name.
     * @default value of CHECKPOINT_TABLE_NAME environment variable
     */
    tableName?: string;
    /**
     * Name of primary key.
     * @default value of the CHECKPOINT_TABLE_KEY_NAME environment variable
     */
    keyName?: string;
}
export declare class CheckpointTable {
    private readonly dynamodb;
    private readonly tableName;
    private readonly keyName;
    constructor(options?: CheckpointTableOptions);
    getLastCheckpoint(): Promise<undefined | number>;
    checkpoint(id: number): Promise<void>;
}
