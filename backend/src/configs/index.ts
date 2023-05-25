import AppConfig from './app.config';
import AwsConfig from './aws.config';
import AuthConfig from './auth.config';
import UserConfig from './user.config';
import FileConfig from './file.config';
import HelperConfig from './helper.config';
import ticketConfig from './ticket.config';
import DatabaseConfig from './database.config';
import UserProfile from './userProfile.config';
import MiddlewareConfig from './middleware.config';
import CompanyProfile from './companyProfile.config';

export default [
    AppConfig,
    AuthConfig,
    DatabaseConfig,
    HelperConfig,
    AwsConfig,
    UserConfig,
    MiddlewareConfig,
    FileConfig,
    UserProfile,
    CompanyProfile,
    ticketConfig,
];
