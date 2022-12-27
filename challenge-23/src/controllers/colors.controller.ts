import { Context } from '../../deps.ts';
import * as colorService from '../services/colors.service';

async function GetAllColors(ctx: Context) {
  try {
    const colors = await colorService.GetAllColors();
    await ctx.render('index.ejs', { data: colors });
  } catch (error) {
    console.log(error);
    ctx.response.body = { error: error.message };
  }
}

export { GetAllColors };
