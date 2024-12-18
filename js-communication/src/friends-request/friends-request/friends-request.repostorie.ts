import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FriendRequest } from "./friends-request.entity";

@Injectable()
export class FriendRequesRepositorie{


    constructor(@InjectModel(FriendRequest.name) private friendRequestModel: Model<FriendRequest>){}

    async createRequest(createRequestDto: { from: string; to: string; status: string }): Promise<FriendRequest> {
        const newRequest = new this.friendRequestModel(createRequestDto);
        return newRequest.save();
      }

    async findRequest(fromId: string , toId: string ) : Promise<FriendRequest | null> {
        
        return this.friendRequestModel.findOne({from: fromId , to: toId}).exec();
    }


    async updateStatus(requestId: string , status: 'approve'|'reject'):Promise<FriendRequest>  {


        return await this.friendRequestModel.findOneAndUpdate( {_id: requestId} ,{status},{new:true}).exec();
    }

    async deleteRequest(fromId: string , toId: string) {

        return await this.friendRequestModel.findOneAndDelete({from: fromId , to: toId}).exec();
    }

    async getUserRequests(userId : string): Promise<FriendRequest[]>{

        return await this.friendRequestModel.find({$or:[{ From:userId},{To:userId}]}).exec();
    }

    async getUserReq(userId: string): Promise<FriendRequest[]>{

        return await this.friendRequestModel.find({to: userId , status:'pending'}).populate('from','userName email').exec();

    }

   

    }

