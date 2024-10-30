import { defineStore } from 'pinia'

export const useMenu = defineStore('menuStore', {
  state: () => ({
    thedata: null,
    themenu: null,
    thelogo: null,
    thebranches: null,
    thestyles:null,
    thename: null,
    navSidebarView: false,
    whatsSidebarView: false,
    navSidebarView2: false,
    fontSize: false,
    areas: null,
    activeArea: null,
    activeNav: 0,
    whatsOrder: null,
    whatsOrderOn: false,
    
  }),
  getters:{
    menu_render: (state) => {
      return state.themenu
        ? state.themenu.filter((i) => i.area === state.activeArea)
        : []
    }
  },
  actions: {
    setTheVariables(og_data, thefilepath) {
        const thedata = og_data
        thedata.menu.menu = thedata.menu.menu.map((item, index) => ({ ...item, realIndex: index }))
      
        this.thedata  = thedata
        this.themenu = thedata.menu.menu
        this.thelogo = thefilepath + thedata.logo
        this.thebranches = thedata.branches
        this.thestyles = thedata.styles
        this.thename = thedata.branches[0].name,
        this.whatsOrder = thedata.whatsOrder
    },
    setSidebar(val){
      this.navSidebarView = val
    },
    setSidebar2(val){
      this.navSidebarView2 = val
    },
    setWhatsSidebar(val){
      this.whatsSidebarView = val
    },
    setFontSize(val){
      this.fontSize = val
    },
    setAreas(areas){
      this.areas = areas
      this.activeArea = areas[0]
    },
    setActiveArea(area){
      this.activeArea = area
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    setActiveNav(index, isScroll){
      this.activeNav = index
      if(!isScroll){
        if (index == 99) {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        } else {
            document.getElementById("cat_" + index).scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    setMenuRender(render){
      this.menurender = render
    },
    setWhatsOrder(val){
      this.whatsOrderOn = val
    },
    setQty(cat,plat,variant,qty){

      if(variant!==null && variant!==undefined){
        this.thedata.menu.menu[cat].list[plat].variants[variant].qty = qty
      } else {
        this.thedata.menu.menu[cat].list[plat].qty = qty

      }
    }
  }
})