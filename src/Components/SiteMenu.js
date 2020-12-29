import React from 'react';
const SiteMenu = (props) => {
    return <React.Fragment>
        {
            window.dnnMenu.filter(c => c.parentId == props.parentId).map((item, index) => {
                return <li key={index} className="bpms-parent-menu bpms-menu-segment menu-down-segment" >
                    <a href={item.url} className="bpms-link-menu">
                        <span className="bpms-link-text">{item.name}</span>
                        {
                            window.dnnMenu.filter(c => c.parentId == item.id).length > 0 &&
                            <i class="fa fa-arrow-right"></i>
                        }
                    </a>
                    {
                        window.dnnMenu.filter(c => c.parentId == item.id).length > 0 &&
                        <div className="bpms-sub-menu menu-submenu menu-down-simple menu-submenu-right" data-hor-direction="menu-submenu-right">
                            <ul className="bpms-down-menu">
                                <SiteMenu parentId={item.id} />
                            </ul>
                        </div>
                    }
                </li> 
            })
        }
    </React.Fragment>
};
export default SiteMenu;
