import {
	wxapi
} from './base.js'
export var
	showPic = ({arr,i}) => {
		// let
		//  arr=e.currentTarget.dataset.arr,
		//  i=e.currentTarget.dataset.i;
		console.log(wxapi);
		return wxapi({name:'previewImage',data:{
			urls:arr,
			current:arr[i]
		}})
	}
