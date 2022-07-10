import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ReactionData } from 'shared/interface/reaction/reaction.interface';

@Entity()
export class Reaction implements ReactionData {
  @Column()
  type: string;

  @PrimaryColumn()
  relateId: string;

  @Column()
  category: string;
}
