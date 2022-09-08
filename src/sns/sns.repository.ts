import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import * as AWS from 'aws-sdk';
import { builtinModules } from 'module';

@Injectable()
export class SNSRepository {
  private myTopicArn: string;
  private sns: AWS.SNS;

  constructor() {
    AWS.config.update({ region: 'us-east-1' });
    this.myTopicArn = 'arn:aws:sns:us-east-1:539220115059:testTopic';
    this.sns = new AWS.SNS();
  }
  async subscribeWithEmail(body: any) {
    const params = {
      Protocol: 'email',
      TopicArn: this.myTopicArn,
      Endpoint: body.mail,
    };

    try {
      await this.sns
        .subscribe(params, (err, data) => {
          if (err) {
            return { body: JSON.stringify(err) };
          } else {
            return { body: JSON.stringify(data) };
          }
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async publishMessage(body: any) {
    const params = {
      Message: body.message,
      TopicArn: this.myTopicArn,
    };

    try {
      await this.sns
        .publish(params, (err, data) => {
          if (err) {
            return { body: JSON.stringify(err) };
          } else {
            return { body: JSON.stringify(data) };
          }
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getList() {
    const params = {
      TopicArn: this.myTopicArn,
    };

    try {
      await this.sns
        .listSubscriptionsByTopic(params, (err, data) => {
          if (err) {
            return { body: JSON.stringify(err) };
          } else {
            return { body: JSON.stringify(data) };
          }
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

// POST - https://924rac1219.execute-api.us-east-1.amazonaws.com/publish
// POST - https://924rac1219.execute-api.us-east-1.amazonaws.com/subscribe

// sls invoke local -f subscribe_SNS --data '{"body":{"email":"mail.muratkara@gmail.com"}}'
// sls invoke local -f publish_SNS --data '{"body":{"message":"hello pavza mates"}}'
