import { QueryOptions, Sequelize } from "sequelize";
import { logger } from "@utilities/logger";

export interface SequelizeProvider {
  sequelize(): Sequelize;

  sequelizeClose(): Promise<void>;

  query(sql: string, options?: QueryOptions): Promise<{ results: any }>;
}

let sequelizeClientInstance: Sequelize;

const sequelizeInstance = (
  db: string,
  user: string,
  password: string,
  host: string,
  port: number
): Sequelize => {
  if (!sequelizeClientInstance) {
    sequelizeClientInstance = new Sequelize(db, user, password, {
      port,
      host,
      dialect: "mysql",
      retry: {
        match: [/Deadlock/i],
        max: 3, // Maximum rety 3 times
      },
      pool: {
        max: 10,
        min: 5,
        acquire: 60000,
        idle: 60000
      },
      define: {
        underscored: false,
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci"
      },
      logging: console.log
    });
  }
  return sequelizeClientInstance;
};

export class SequelizeProviderImpl implements SequelizeProvider {
  private readonly sequelizeClient: Sequelize;
  private readonly host: string = process.env.DB_HOST || "localhost";
  private readonly port: number = Number(process.env.DB_PORT) || 3307;
  private readonly user: string = process.env.DB_USER || "root";
  private readonly password: string = process.env.DB_PASS || "123123";
  private readonly db: string = process.env.DB_NAME || "breed";
  private static instance: SequelizeProviderImpl;

  private constructor() {
    try {
      this.sequelizeClient = sequelizeInstance(
        this.db,
        this.user,
        this.password,
        this.host,
        this.port
      );
    } catch (err) {
      logger.error("error-sequelize:", err);
    }
  }

  public static getInstance() : SequelizeProvider{
    if ( !this.instance ) {
      this.instance = new SequelizeProviderImpl();
    }
    return this.instance

  }

  public sequelize(): Sequelize {
    return this.sequelizeClient;
  }

  public async sequelizeClose(): Promise<void> {
    return this.sequelizeClient.close();
  }

  public async query(
    sql: string,
    options?: QueryOptions
  ): Promise<{ results: any }> {
    try {
      const [results] = await this.sequelizeClient.query(sql, options);
      const response = { results };
      return response;
    } catch (errors) {
      logger.error("errors-query:", errors);
      throw errors;
    }
  }
}
